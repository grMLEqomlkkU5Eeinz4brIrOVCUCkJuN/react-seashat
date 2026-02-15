import { WordSearchService, WordSearch, PrefixSearch, SearchResult, StartsWithResult, PrefixWordsResult } from "models/word.model";

describe("Word Model", () => {
	let service: WordSearchService;

	beforeEach(() => {
		service = new WordSearchService({ words: ["apple", "application", "apply", "banana", "band"] });
	});

	describe("WordSearchService.searchForWord", () => {
		it("should return found: true for an existing word", () => {
			const result: SearchResult = service.searchForWord("apple");
			expect(result).toEqual({ word: "apple", found: true });
		});

		it("should return found: false for a non-existing word", () => {
			const result: SearchResult = service.searchForWord("orange");
			expect(result).toEqual({ word: "orange", found: false });
		});

		it("should return found: false for a prefix that is not a complete word", () => {
			const result = service.searchForWord("app");
			expect(result).toEqual({ word: "app", found: false });
		});
	});

	describe("WordSearchService.searchStartsWith", () => {
		it("should return matches: true when words exist with the given prefix", () => {
			const result: StartsWithResult = service.searchStartsWith("app");
			expect(result).toEqual({ prefix: "app", matches: true });
		});

		it("should return matches: false when no words start with the given prefix", () => {
			const result: StartsWithResult = service.searchStartsWith("xyz");
			expect(result).toEqual({ prefix: "xyz", matches: false });
		});
	});

	describe("WordSearchService.getWordsWithPrefix", () => {
		it("should return all words matching the prefix", () => {
			const result: PrefixWordsResult = service.getWordsWithPrefix("app");
			expect(result.prefix).toBe("app");
			expect(result.words.sort()).toEqual(["apple", "application", "apply"].sort());
		});

		it("should return an empty array when no words match the prefix", () => {
			const result: PrefixWordsResult = service.getWordsWithPrefix("xyz");
			expect(result).toEqual({ prefix: "xyz", words: [] });
		});
	});

	describe("WordSearchService.insert", () => {
		it("should insert a word so it becomes searchable", () => {
			expect(service.searchForWord("orange").found).toBe(false);
			service.insert("orange");
			expect(service.searchForWord("orange").found).toBe(true);
		});
	});

	describe("WordSearchService.insertBatch", () => {
		it("should insert multiple words and return the count", () => {
			const count = service.insertBatch(["cat", "car", "card"]);
			expect(count).toBe(3);
			expect(service.searchForWord("cat").found).toBe(true);
			expect(service.searchForWord("car").found).toBe(true);
			expect(service.searchForWord("card").found).toBe(true);
		});
	});

	describe("WordSearchService.size", () => {
		it("should return the number of words in the trie", () => {
			expect(service.size()).toBe(5);
		});

		it("should update after inserting new words", () => {
			service.insert("cherry");
			expect(service.size()).toBe(6);
		});
	});

	describe("constructor options", () => {
		it("should create an empty trie when no words are provided", () => {
			const emptyService = new WordSearchService();
			expect(emptyService.size()).toBe(0);
			expect(emptyService.searchForWord("anything").found).toBe(false);
		});
	});
});
