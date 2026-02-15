export interface SearchResult {
	word: string
	found: boolean
}

export interface StartsWithResult {
	prefix: string
	matches: boolean
}

export interface PrefixWordsResult {
	prefix: string
	words: string[]
}

export interface ApiError {
	success: false
	message: string
}

export type WordApiResponse = SearchResult | StartsWithResult | PrefixWordsResult

export type SearchMode = 'search' | 'starts-with' | 'prefix'
