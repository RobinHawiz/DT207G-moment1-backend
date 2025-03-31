export interface ICourses {
  id: number;
  courseCode: string;
  courseName: string;
  syllabus: string;
  progression: "A" | "B" | "C";
}

// For POST requests (client → server)
export type CoursePayload = Omit<ICourses, "id">;
