import { Router, Request, Response } from "express";
import { CoursesService } from "../service/CoursesService.js";
import { getCourses } from "../controllers/coursesController.js";
import { ConnectionPool } from "mssql";

export function coursesRoutes(pool: ConnectionPool) {
  const router: Router = Router();
  const courseService: CoursesService = new CoursesService(pool);

  router.get("/", async (req: Request, res: Response) => {
    try {
      await getCourses(req, res, courseService);
    } catch (error: any) {
      console.error("Error in GET /courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
}
