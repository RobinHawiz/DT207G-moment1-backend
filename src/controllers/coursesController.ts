import { CoursesService } from "../service/CoursesService.js";
import { Request, Response } from "express";

/**
 * Handles GET /courses
 *
 * Retrieves all course records and returns them in the response.
 *
 * @param _ - Unused Express Request object
 * @param res - Express Response object
 * @param courseService - Injected service for retrieving courses
 */
export async function getCourses(
  _: Request,
  res: Response,
  courseService: CoursesService
): Promise<void> {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error: any) {
    console.error("Error retrieving courses data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles POST /courses/insert
 *
 * Inserts a new course using the request body and returns a success message.
 *
 * @param req - Express Request object (expected to contain validated course payload)
 * @param res - Express Response object
 * @param courseService - Injected service for inserting courses
 */
export async function insertCourses(
  req: Request,
  res: Response,
  courseService: CoursesService
): Promise<void> {
  try {
    await courseService.insertCourses(req);
    res.status(201).json({ message: "Course inserted successfully" });
  } catch (error: any) {
    console.error("Error inserting courses data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles DELETE /courses/delete
 *
 * Deletes a course based on the request input and returns a success message.
 *
 * @param req - Express Request object (expected to contain validated course ID)
 * @param res - Express Response object
 * @param courseService - Injected service for deleting courses
 */
export async function deleteCourses(
  req: Request,
  res: Response,
  courseService: CoursesService
): Promise<void> {
  try {
    await courseService.deleteCourses(req);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting course:", error);
    res.status(404).json({ error: error.message });
  }
}
