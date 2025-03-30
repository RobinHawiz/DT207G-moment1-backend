import sql, { ConnectionPool } from "mssql";
import { ICourses, CoursePayload } from "../models/ICourses.js";
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
  req: Request<unknown, unknown, CoursePayload>
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

export async function deleteCourses(
  pool: ConnectionPool,
  req: Request
): Promise<void> {
  try {
    const { id }: { id: number } = req.body;
    const request = new sql.Request(pool);

    request.input("id", sql.Int, id);

    await request.execute<ICourses>("spCourses_DeleteById");
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
}

export async function checkCourses(
  pool: ConnectionPool,
  req: Request
): Promise<number> {
  try {
    const { id }: { id: number } = req.body;
    const request = new sql.Request(pool);

    request.input("id", sql.Int, id);

    const result = await request.execute<ICourses>(
      "spCourses_CheckExistanceById"
    );
    // result.recordset gives the following format: [{'':number}] where number is either 1 or 0. 1 = course exists, 0 = course does not exist.
    return Object.values(result.recordset[0])[0]; // We do this to return the number only.
  } catch (error) {
    console.error("Database lookup error:", error);
    throw error;
  }
}
