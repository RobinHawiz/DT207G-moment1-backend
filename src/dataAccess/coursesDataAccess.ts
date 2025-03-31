import sql, { ConnectionPool } from "mssql";
import { ICourses, CoursePayload } from "../models/ICourses.js";
import { Request } from "express";

/**
 * Retrieves all courses from the database.
 *
 * @param pool - Active SQL Server connection pool
 * @returns An array of course records
 */
export async function getAllCourses(
  pool: ConnectionPool
): Promise<Array<ICourses>> {
  let result = await new sql.Request(pool).execute<ICourses>(
    "spCourses_GetAll"
  );
  return result.recordset ?? [];
}

/**
 * Inserts a new course into the database using values from the request body.
 *
 * @param pool - SQL Server connection pool
 * @param req - Express Request object containing a validated CoursePayload in the body
 * @throws If the database operation fails
 */
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

/**
 * Deletes a course from the database based on the provided ID.
 *
 * @param pool - SQL Server connection pool
 * @param req - Express Request object containing the ID in the body, which represents the course to delete
 * @throws If the database operation fails
 */
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

/**
 * Checks whether a course exists in the database based on the provided ID.
 *
 *
 * The stored procedure is expected to return a single-row recordset in the form:
 *   [{ '': 1 }] if the course exists
 *   [{ '': 0 }] if it does not
 *
 * @param pool - SQL Server connection pool
 * @param req - Express Request object containing the course ID in the body, which represents the course to check
 * @returns 1 if the course exists, 0 otherwise
 * @throws If the database operation fails
 */
export async function checkCourses(
  pool: ConnectionPool,
  req: Request
): Promise<number> {
  try {
    const { id }: { id: number } = req.body;
    const request = new sql.Request(pool);

    request.input("id", sql.Int, id);

    // result.recordset format: [{ '': number }]
    const result = await request.execute<ICourses>(
      "spCourses_CheckExistanceById"
    );
    return Object.values(result.recordset[0])[0];
  } catch (error) {
    console.error("Database lookup error:", error);
    throw error;
  }
}
