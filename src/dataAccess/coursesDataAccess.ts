import sql, { ConnectionPool } from "mssql";
import { ICourses } from "../models/ICourses.js";
import { Request } from "express";

export async function getAllCourses(
  pool: ConnectionPool
): Promise<Array<ICourses>> {
  return new Promise((resolve, reject) => {
    new sql.Request(pool).execute<ICourses>(
      "spCourses_GetAll",
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result!.recordset as Array<ICourses>);
      }
    );
  });
}

export async function insertCourses(
  pool: ConnectionPool,
  req: Request
): Promise<void> {
  try {
    const { courseCode, courseName, syllabus, progression } = req.body;
    const request = new sql.Request(pool);

    request.input("courseCode", sql.NVarChar, courseCode);
    request.input("courseName", sql.NVarChar, courseName);
    request.input("syllabus", sql.NVarChar, syllabus);
    request.input("progression", sql.Char, progression);

    await request.execute<ICourses>("spCourses_Insert");
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
}
