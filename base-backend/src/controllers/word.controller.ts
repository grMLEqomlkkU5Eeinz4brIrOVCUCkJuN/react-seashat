import { Request, Response } from "express";
import { wordSearchService } from "../services/wordSearch.service";

export const searchWord = (req: Request, res: Response): void => {
	const { word } = req.query as { word: string };
	res.json(wordSearchService.searchForWord(word));
};

export const startsWith = (req: Request, res: Response): void => {
	const { prefix } = req.query as { prefix: string };
	res.json(wordSearchService.searchStartsWith(prefix));
};

export const getWordsWithPrefix = (req: Request, res: Response): void => {
	const { prefix } = req.query as { prefix: string };
	res.json(wordSearchService.getWordsWithPrefix(prefix));
};
