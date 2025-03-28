import { ConnectionPool } from "mssql";
import * as dataAccess from "../dataAccess/coursesDataAccess.js";

export class CoursesService {
  private readonly pool: ConnectionPool;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }

  async getAllCourses() {
    return dataAccess.getAllCourses(this.pool);
  }
}
