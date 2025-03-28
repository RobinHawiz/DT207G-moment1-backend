import { CoursesService } from "../service/CoursesService.js";
import { Request, Response } from "express";

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
