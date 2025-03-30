import { Router, Request, Response } from "express";
import { CoursesService } from "../service/CoursesService.js";
import {
  getCourses,
  insertCourses,
  deleteCourses,
} from "../controllers/coursesController.js";
import { ConnectionPool } from "mssql";
import {
  coursesValidation,
  coursesIdValidation,
} from "../middlewares/coursesValidation.js";
import { validationResult } from "express-validator";

export function coursesRoutes(pool: ConnectionPool): Router {
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

  router.post(
    "/insert",
    coursesValidation,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      await insertCourses(req, res, courseService);
    }
  );

  router.delete(
    "/delete",
    coursesIdValidation,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      await deleteCourses(req, res, courseService);
    }
  );

  return router;
}
