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
