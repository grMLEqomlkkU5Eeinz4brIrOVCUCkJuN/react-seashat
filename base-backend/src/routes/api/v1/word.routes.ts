import { Router } from "express";
import { validate } from "../../../middleware/validate";
import { wordSearchSchema, prefixSearchSchema } from "../../../models/word.model";
import asyncHandler from "../../../utils/asyncHandler";
import {
	searchWord,
	startsWith,
	getWordsWithPrefix,
} from "../../../controllers/word.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         word:
 *           type: string
 *         found:
 *           type: boolean
 *     StartsWithResult:
 *       type: object
 *       properties:
 *         prefix:
 *           type: string
 *         matches:
 *           type: boolean
 *     PrefixWordsResult:
 *       type: object
 *       properties:
 *         prefix:
 *           type: string
 *         words:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /words/search:
 *   get:
 *     summary: Search for a word in the dictionary
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     responses:
 *       200:
 *         description: Search result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResult'
 *       400:
 *         description: Validation error
 */
router.get(
	"/search",
	validate({ query: wordSearchSchema }),
	asyncHandler(searchWord)
);

/**
 * @swagger
 * /words/starts-with:
 *   get:
 *     summary: Check if any words start with the given prefix
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: prefix
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     responses:
 *       200:
 *         description: Prefix match result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartsWithResult'
 *       400:
 *         description: Validation error
 */
router.get(
	"/starts-with",
	validate({ query: prefixSearchSchema }),
	asyncHandler(startsWith)
);

/**
 * @swagger
 * /words/prefix:
 *   get:
 *     summary: Get all words matching a prefix
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: prefix
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     responses:
 *       200:
 *         description: List of matching words
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrefixWordsResult'
 *       400:
 *         description: Validation error
 */
router.get(
	"/prefix",
	validate({ query: prefixSearchSchema }),
	asyncHandler(getWordsWithPrefix)
);

export default router;
