import { ConnectionPool } from "mssql";
import * as dataAccess from "../dataAccess/coursesDataAccess.js";
import { Request } from "express";

export class CoursesService {
  private readonly pool: ConnectionPool;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }

  async getAllCourses() {
    return dataAccess.getAllCourses(this.pool);
  }

  async insertCourses(req: Request) {
    return dataAccess.insertCourses(this.pool, req);
  }

  async deleteCourses(req: Request) {
    const courseExists: number = await dataAccess.checkCourses(this.pool, req);
    if (!courseExists) {
      throw new Error("Kursen med det Id't existerar inte!");
    }
    return dataAccess.deleteCourses(this.pool, req);
  }
}
