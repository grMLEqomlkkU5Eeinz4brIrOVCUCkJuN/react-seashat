"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../../../middleware/validate");
const word_model_1 = require("../../../models/word.model");
const asyncHandler_1 = __importDefault(require("../../../utils/asyncHandler"));
const word_controller_1 = require("../../../controllers/word.controller");
const router = (0, express_1.Router)();
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
router.get("/search", (0, validate_1.validate)({ query: word_model_1.wordSearchSchema }), (0, asyncHandler_1.default)(word_controller_1.searchWord));
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
router.get("/starts-with", (0, validate_1.validate)({ query: word_model_1.prefixSearchSchema }), (0, asyncHandler_1.default)(word_controller_1.startsWith));
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
router.get("/prefix", (0, validate_1.validate)({ query: word_model_1.prefixSearchSchema }), (0, asyncHandler_1.default)(word_controller_1.getWordsWithPrefix));
exports.default = router;
//# sourceMappingURL=word.routes.js.map