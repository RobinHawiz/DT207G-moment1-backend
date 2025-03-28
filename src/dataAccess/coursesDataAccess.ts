import sql from "mssql";
import { connectToDatabase } from "../config/db.js";
import { ICourses } from "../models/ICourses.js";

export async function getAllCourses(): Promise<Array<ICourses>> {
  const pool = await connectToDatabase();
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
