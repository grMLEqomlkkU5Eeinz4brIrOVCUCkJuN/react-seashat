import { z } from "zod";
export declare const wordSearchSchema: z.ZodObject<{
    word: z.ZodString;
}, z.core.$strip>;
export declare const prefixSearchSchema: z.ZodObject<{
    prefix: z.ZodString;
}, z.core.$strip>;
export declare const searchResultSchema: z.ZodObject<{
    word: z.ZodString;
    found: z.ZodBoolean;
}, z.core.$strip>;
export declare const startsWithResultSchema: z.ZodObject<{
    prefix: z.ZodString;
    matches: z.ZodBoolean;
}, z.core.$strip>;
export declare const prefixWordsResultSchema: z.ZodObject<{
    prefix: z.ZodString;
    words: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type WordSearch = z.infer<typeof wordSearchSchema>;
export type PrefixSearch = z.infer<typeof prefixSearchSchema>;
export type SearchResult = z.infer<typeof searchResultSchema>;
export type StartsWithResult = z.infer<typeof startsWithResultSchema>;
export type PrefixWordsResult = z.infer<typeof prefixWordsResultSchema>;
export declare class WordSearchService {
    private trie;
    constructor(options?: {
        words?: string[];
        ignoreCase?: boolean;
    });
    searchForWord(word: string): SearchResult;
    searchStartsWith(prefix: string): StartsWithResult;
    getWordsWithPrefix(prefix: string): PrefixWordsResult;
    insert(word: string): void;
    insertBatch(words: string[]): number;
    insertFromFile(filePath: string, bufferSize?: number): number;
    size(): number;
}
//# sourceMappingURL=word.model.d.ts.map