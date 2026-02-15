"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../test/app");
describe("GET /api/v1/health", () => {
    const app = (0, app_1.createTestApp)();
    it("should return status ok", async () => {
        const response = await (0, supertest_1.default)(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            status: "ok",
        });
        expect(response.body.timestamp).toBeDefined();
    });
});
//# sourceMappingURL=health.routes.test.js.map