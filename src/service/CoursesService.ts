import { ConnectionPool } from "mssql";
import * as dataAccess from "../dataAccess/coursesDataAccess.js";
import { Request } from "express";
import { ICourses } from "../models/ICourses.js";

export class CoursesService {
  private readonly pool: ConnectionPool;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }

  async getAllCourses(): Promise<ICourses[]> {
    return dataAccess.getAllCourses(this.pool);
  }

  async insertCourses(req: Request): Promise<void> {
    return dataAccess.insertCourses(this.pool, req);
  }

  async deleteCourses(req: Request): Promise<void> {
    const courseExists: number = await dataAccess.checkCourses(this.pool, req);
    if (!courseExists) {
      throw new Error("Kursen med det Id't existerar inte!");
    }
    return dataAccess.deleteCourses(this.pool, req);
  }
}
