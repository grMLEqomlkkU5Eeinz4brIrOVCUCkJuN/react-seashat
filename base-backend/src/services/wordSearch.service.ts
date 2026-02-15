import path from "path";
import { WordSearchService } from "../models/word.model";
import logger from "../utils/logger";

const WORD_LIST_PATH = path.join(__dirname, "../../data/enable1.txt");

export const wordSearchService = new WordSearchService();

export const initWordSearch = (): void => {
	const count = wordSearchService.insertFromFile(WORD_LIST_PATH);
	logger.info(`Trie initialized with ${count} words from enable1.txt`);
};
