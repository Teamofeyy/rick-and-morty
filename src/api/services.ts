import { api } from "./axios.api";
import type { Character, Episode, Info, Location } from "./types";

export const getCharacters = (page: number, name?: string) =>
  api
    .get<Info<Character>>("/character", { params: { page, name: name || undefined } })
    .then(r => r.data);

export const getLocations = (page: number, name?: string) =>
  api
    .get<Info<Location>>("/location", { params: { page, name: name || undefined } })
    .then(r => r.data);

export const getEpisodes = (page: number, name?: string) =>
  api
    .get<Info<Episode>>("/episode", { params: { page, name: name || undefined } })
    .then(r => r.data);

export const getCharacterById = (id: string) =>
  api.get<Character>(`/character/${id}`).then(r => r.data);

export const getEpisodeById = (id: string) =>
  api.get<Episode>(`/episode/${id}`).then(r => r.data);

export const getLocationById = (id: string) =>
  api.get<Location>(`/location/${id}`).then(r => r.data);

export async function fetchResourcesByUrls<T>(urls: string[]) {
  const responses = await Promise.all(urls.map((u) => api.get<T>(u)));
  return responses.map((r) => r.data);
}