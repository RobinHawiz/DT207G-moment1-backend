export interface ICourses {
  id: number;
  courseCode: string;
  courseName: string;
  syllabus: string;
  progression: string;
}

// For POST requests (client → server)
export type CoursePayload = Omit<ICourses, "id">;
