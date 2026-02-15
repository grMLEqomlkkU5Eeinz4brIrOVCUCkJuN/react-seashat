"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSearchService = exports.prefixWordsResultSchema = exports.startsWithResultSchema = exports.searchResultSchema = exports.prefixSearchSchema = exports.wordSearchSchema = void 0;
const zod_1 = require("zod");
const seshat_trie_1 = require("seshat-trie");
// Query params for word operations
exports.wordSearchSchema = zod_1.z.object({
    word: zod_1.z.string().min(1),
});
exports.prefixSearchSchema = zod_1.z.object({
    prefix: zod_1.z.string().min(1),
});
// Response schemas
exports.searchResultSchema = zod_1.z.object({
    word: zod_1.z.string(),
    found: zod_1.z.boolean(),
});
exports.startsWithResultSchema = zod_1.z.object({
    prefix: zod_1.z.string(),
    matches: zod_1.z.boolean(),
});
exports.prefixWordsResultSchema = zod_1.z.object({
    prefix: zod_1.z.string(),
    words: zod_1.z.array(zod_1.z.string()),
});
class WordSearchService {
    trie;
    constructor(options) {
        this.trie = new seshat_trie_1.Seshat(options);
    }
    searchForWord(word) {
        return { word, found: this.trie.search(word) };
    }
    searchStartsWith(prefix) {
        return { prefix, matches: this.trie.startsWith(prefix) };
    }
    getWordsWithPrefix(prefix) {
        return { prefix, words: this.trie.getWordsWithPrefix(prefix) };
    }
    insert(word) {
        this.trie.insert(word);
    }
    insertBatch(words) {
        return this.trie.insertBatch(words);
    }
    insertFromFile(filePath, bufferSize) {
        return this.trie.insertFromFile(filePath, bufferSize);
    }
    size() {
        return this.trie.size();
    }
}
exports.WordSearchService = WordSearchService;
//# sourceMappingURL=word.model.js.map