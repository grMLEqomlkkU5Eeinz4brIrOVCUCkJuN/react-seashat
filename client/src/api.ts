import type { SearchResult, StartsWithResult, PrefixWordsResult, ApiError } from './types'

const BASE = 'http://localhost:3000/api/v1/words'

async function request<T>(url: string): Promise<T> {
	const res = await fetch(url)

	if (!res.ok) {
		const body = await res.json() as ApiError
		throw new Error(body.message || `Request failed with status ${res.status}`)
	}

	return res.json() as Promise<T>
}

export function searchWord(word: string): Promise<SearchResult> {
	return request<SearchResult>(`${BASE}/search?word=${encodeURIComponent(word)}`)
}

export function checkStartsWith(prefix: string): Promise<StartsWithResult> {
	return request<StartsWithResult>(`${BASE}/starts-with?prefix=${encodeURIComponent(prefix)}`)
}

export function getWordsWithPrefix(prefix: string): Promise<PrefixWordsResult> {
	return request<PrefixWordsResult>(`${BASE}/prefix?prefix=${encodeURIComponent(prefix)}`)
}
