import axios from "axios";
import { API_BASE_URL, api } from "./axios.api";
import type { Character, Episode, Location, PaginatedResponse } from "./types";

type ResourceName = "character" | "episode" | "location";

export type PageRequest = {
  page: number;
  search: string;
  signal: AbortSignal;
};

export type PageFetcher<T> = (request: PageRequest) => Promise<PaginatedResponse<T>>;

const emptyPage = <T>(): PaginatedResponse<T> => ({
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
});

const createPageFetcher = <T>(resource: ResourceName): PageFetcher<T> =>
  async ({ page, search, signal }) => {
    try {
      const response = await api.get<PaginatedResponse<T>>(`/${resource}`, {
        params: { page, name: search || undefined },
        signal,
      });

      return response.data;
    } catch (error) {
      // The API uses 404 for a valid search with no matches.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return emptyPage<T>();
      }

      throw error;
    }
  };

const getResourceById = async <T>(
  resource: ResourceName,
  id: number,
  signal: AbortSignal,
) => {
  const response = await api.get<T>(`/${resource}/${id}`, { signal });
  return response.data;
};

export const getCharacters = createPageFetcher<Character>("character");
export const getLocations = createPageFetcher<Location>("location");
export const getEpisodes = createPageFetcher<Episode>("episode");

export const getCharacterById = (id: number, signal: AbortSignal) =>
  getResourceById<Character>("character", id, signal);

export const getEpisodeById = (id: number, signal: AbortSignal) =>
  getResourceById<Episode>("episode", id, signal);

export const getLocationById = (id: number, signal: AbortSignal) =>
  getResourceById<Location>("location", id, signal);

export function getResourceIdFromUrl(url: string, resource: ResourceName): number | null {
  try {
    const parsedUrl = new URL(url);
    const apiUrl = new URL(API_BASE_URL);
    const match = new RegExp(`^/api/${resource}/(\\d+)/?$`).exec(parsedUrl.pathname);

    if (parsedUrl.origin !== apiUrl.origin || !match) return null;

    const id = Number(match[1]);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

export async function getResourcesByUrls<T>(
  resource: ResourceName,
  urls: readonly string[],
  signal: AbortSignal,
): Promise<T[]> {
  const ids = [...new Set(urls.map((url) => getResourceIdFromUrl(url, resource)))]
    .filter((id): id is number => id !== null);

  if (ids.length === 0) return [];

  const response = await api.get<T | T[]>(`/${resource}/${ids.join(",")}`, { signal });
  return Array.isArray(response.data) ? response.data : [response.data];
}

export function shouldRetryRequest(failureCount: number, error: unknown) {
  if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
    return false;
  }

  return failureCount < 2;
}
