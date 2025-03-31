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

/**
 * Factory function to create course-related API routes.
 *
 * - Injects a database connection pool into the route layer
 * - Applies validation middleware where necessary
 * - Delegates request handling to controller functions
 *
 * @param pool - Active SQL Server connection pool
 * @returns Configured Express router for /courses endpoints
 */
export function coursesRoutes(pool: ConnectionPool): Router {
  const router: Router = Router();
  const courseService: CoursesService = new CoursesService(pool);

  /**
   * GET /courses
   * Fetches all available courses.
   */
  router.get("/", async (req: Request, res: Response) => {
    try {
      await getCourses(req, res, courseService);
    } catch (error: any) {
      console.error("Error in GET /courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * POST /courses/insert
   * Inserts a new course after validating the request body.
   */
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

  /**
   * DELETE /courses/delete
   * Deletes a course by ID after validating the input.
   */
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
