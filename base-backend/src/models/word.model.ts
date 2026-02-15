import { z } from "zod";
import { Seshat } from "seshat-trie";

// Query params for word operations
export const wordSearchSchema = z.object({
	word: z.string().min(1),
});

export const prefixSearchSchema = z.object({
	prefix: z.string().min(1),
});

// Response schemas
export const searchResultSchema = z.object({
	word: z.string(),
	found: z.boolean(),
});

export const startsWithResultSchema = z.object({
	prefix: z.string(),
	matches: z.boolean(),
});

export const prefixWordsResultSchema = z.object({
	prefix: z.string(),
	words: z.array(z.string()),
});

// Inferred types
export type WordSearch = z.infer<typeof wordSearchSchema>;
export type PrefixSearch = z.infer<typeof prefixSearchSchema>;
export type SearchResult = z.infer<typeof searchResultSchema>;
export type StartsWithResult = z.infer<typeof startsWithResultSchema>;
export type PrefixWordsResult = z.infer<typeof prefixWordsResultSchema>;

export class WordSearchService {
	private trie: Seshat;

	constructor(options?: { words?: string[]; ignoreCase?: boolean }) {
		this.trie = new Seshat(options);
	}

	searchForWord(word: string): SearchResult {
		return { word, found: this.trie.search(word) };
	}

	searchStartsWith(prefix: string): StartsWithResult {
		return { prefix, matches: this.trie.startsWith(prefix) };
	}

	getWordsWithPrefix(prefix: string): PrefixWordsResult {
		return { prefix, words: this.trie.getWordsWithPrefix(prefix) };
	}

	insert(word: string): void {
		this.trie.insert(word);
	}

	insertBatch(words: string[]): number {
		return this.trie.insertBatch(words);
	}

	insertFromFile(filePath: string, bufferSize?: number): number {
		return this.trie.insertFromFile(filePath, bufferSize);
	}

	size(): number {
		return this.trie.size();
	}
}