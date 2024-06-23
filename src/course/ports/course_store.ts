import { Result } from "@course/error";
import { Course, CourseDetails } from "@course/domain";
import { Unit } from "@common/unit";
import { Ctx } from "@common/ctx";

export interface CourseStore {
  createCourse(
    ctx: Ctx,
    courseDetails: CourseDetails,
    courseId: string
  ): Promise<Result<Course>>;
  getCourse(ctx: Ctx, courseId: string): Promise<Result<Course>>;
  listCourses(ctx: Ctx): Promise<Result<Course[]>>;
  updateCourse(
    ctx: Ctx,
    courseId: string,
    courseDetails: CourseDetails
  ): Promise<Result<Course>>;
  deleteCourse(ctx: Ctx, courseId: string): Promise<Result<Unit>>;
}
