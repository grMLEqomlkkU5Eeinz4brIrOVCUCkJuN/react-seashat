"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordsWithPrefix = exports.startsWith = exports.searchWord = void 0;
const wordSearch_service_1 = require("../services/wordSearch.service");
const searchWord = (req, res) => {
    const { word } = req.query;
    res.json(wordSearch_service_1.wordSearchService.searchForWord(word));
};
exports.searchWord = searchWord;
const startsWith = (req, res) => {
    const { prefix } = req.query;
    res.json(wordSearch_service_1.wordSearchService.searchStartsWith(prefix));
};
exports.startsWith = startsWith;
const getWordsWithPrefix = (req, res) => {
    const { prefix } = req.query;
    res.json(wordSearch_service_1.wordSearchService.getWordsWithPrefix(prefix));
};
exports.getWordsWithPrefix = getWordsWithPrefix;
//# sourceMappingURL=word.controller.js.map