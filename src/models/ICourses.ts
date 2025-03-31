export interface ICourses {
  /** Auto-incremented unique identifier for the course */
  id: number;
  /** Unique course code (e.g., "DT162G") */
  courseCode: string;
  /** Human-readable course name (e.g., "JavaScript Backend Development") */
  courseName: string;
  /** URL of the course syllabus */
  syllabus: string;
  /** Progression level: A (intro), B (intermediate), C (advanced) */
  progression: "A" | "B" | "C";
}

/**
 * Represents the payload required to create a new course.
 *
 * This type omits the `id` field, since it is generated by the database.
 * Used for POST request bodies.
 */
export type CoursePayload = Omit<ICourses, "id">;
