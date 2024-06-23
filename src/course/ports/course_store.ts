import { Result } from "@course/error";
import { Course, CourseDetails } from "@course/domain";
import { Unit } from "@common/unit";

export interface CourseStore {
  createCourse(
    courseDetails: CourseDetails,
    courseId: string
  ): Promise<Result<Course>>;
  getCourse(courseId: string): Promise<Result<Course>>;
  listCourses(): Promise<Result<Course[]>>;
  deleteCourse(courseId: string): Promise<Result<Unit>>;
}
