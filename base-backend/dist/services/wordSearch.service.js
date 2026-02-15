"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWordSearch = exports.wordSearchService = void 0;
const path_1 = __importDefault(require("path"));
const word_model_1 = require("../models/word.model");
const logger_1 = __importDefault(require("../utils/logger"));
const WORD_LIST_PATH = path_1.default.join(__dirname, "../../data/enable1.txt");
exports.wordSearchService = new word_model_1.WordSearchService();
const initWordSearch = () => {
    const count = exports.wordSearchService.insertFromFile(WORD_LIST_PATH);
    logger_1.default.info(`Trie initialized with ${count} words from enable1.txt`);
};
exports.initWordSearch = initWordSearch;
//# sourceMappingURL=wordSearch.service.js.map