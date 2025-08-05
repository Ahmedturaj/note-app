import { Router } from "express";
import noteRouter from "../app/modules/note/note.router";

const router = Router();

// Proper structure for route modules
const moduleRouter = [
  {
    path: "/note",
    router: noteRouter,
  },
];

// Register all routes
moduleRouter.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
