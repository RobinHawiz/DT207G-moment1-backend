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
    return dataAccess.deleteCourses(this.pool, req);
  }
}
