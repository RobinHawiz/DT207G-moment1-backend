import { ConnectionPool } from "mssql";
import * as dataAccess from "../dataAccess/coursesDataAccess.js";
import { Request } from "express";
import { ICourses } from "../models/ICourses.js";

/**
 * Service layer for handling course-related business operations.
 *
 * - Receives a SQL Server connection pool via dependency injection
 * - Delegates DB calls to the data access layer
 * - Contains validation/business logic around course existence
 */
export class CoursesService {
  private readonly pool: ConnectionPool;

  /**
   * Constructs a new instance of the CoursesService.
   *
   * @param pool - An active SQL Server connection pool
   */
  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }

  /**
   * Retrieves all courses from the database.
   *
   * @returns An array of course records
   */
  async getAllCourses(): Promise<ICourses[]> {
    return dataAccess.getAllCourses(this.pool);
  }

  /**
   * Inserts a new course into the database using request body data.
   *
   * @param req - Express Request containing the validated course payload
   */
  async insertCourses(req: Request): Promise<void> {
    await dataAccess.insertCourses(this.pool, req);
  }

  /**
   * Deletes a course if it exists in the database.
   *
   * @param req - Express Request containing course ID in the body
   * @throws Error if the course does not exist
   */
  async deleteCourses(req: Request): Promise<void> {
    const courseExists: number = await dataAccess.checkCourses(this.pool, req);
    if (!courseExists) {
      throw new Error("Kursen med det Id't existerar inte!");
    }
    await dataAccess.deleteCourses(this.pool, req);
  }
}
