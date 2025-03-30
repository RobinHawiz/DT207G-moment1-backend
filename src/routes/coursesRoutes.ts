import { Router, Request, Response } from "express";
import { CoursesService } from "../service/CoursesService.js";
import { getCourses, insertCourses } from "../controllers/coursesController.js";
import { ConnectionPool } from "mssql";
import { coursesValidation } from "../middlewares/coursesValidation.js";
import { validationResult } from "express-validator";

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

  router.post(
    "/insert",
    coursesValidation,
    async (req: Request, res: Response) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      await insertCourses(req, res, courseService);
    }
  );

  return router;
}
