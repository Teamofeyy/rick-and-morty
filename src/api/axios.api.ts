import axios from 'axios'
import type { Info, Character } from './types'

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

export default async function fetchCharacters(page: number): Promise<Info<Character>> {
  const { data } = await api.get(`/character`, { params: { page } })
  return data
}
