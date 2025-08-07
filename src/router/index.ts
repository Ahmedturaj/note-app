import { Router } from "express";
import noteRouter from "../app/modules/note/note.router";
import userRouter from "../app/modules/user/user.route";

const router = Router();

// Proper structure for route modules
const moduleRouter = [
  {
    path: "/note",
    router: noteRouter,
  },
  
  {
    path:"/user",
    router:userRouter
  }
];

// Register all routes
moduleRouter.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
