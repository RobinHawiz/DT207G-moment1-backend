import sql, { ConnectionPool } from "mssql";
import { ICourses } from "../models/ICourses.js";

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
