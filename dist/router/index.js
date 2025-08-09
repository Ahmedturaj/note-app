"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_router_1 = __importDefault(require("../app/modules/note/note.router"));
const user_route_1 = __importDefault(require("../app/modules/user/user.route"));
const router = (0, express_1.Router)();
// Proper structure for route modules
const moduleRouter = [
    {
        path: "/note",
        router: note_router_1.default,
    },
    {
        path: "/user",
        router: user_route_1.default
    }
];
// Register all routes
moduleRouter.forEach((route) => {
    router.use(route.path, route.router);
});
exports.default = router;
