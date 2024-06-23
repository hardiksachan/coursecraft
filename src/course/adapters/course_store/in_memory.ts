import { unit, Unit } from "@common/unit";
import { CourseDetails, Course, courseSchema, Lesson } from "@course/domain";
import { CourseNotFoundError, Result } from "@course/error";
import { CourseStore } from "@course/ports";
import { err, ok } from "@common/result";

type CourseRow = {
  courseId: string;
  courseDetails: CourseDetails;
  lessons: Lesson[];
};

export class InMemoryCourseStore implements CourseStore {
  courses: CourseRow[] = [];

  async createCourse(
    courseDetails: CourseDetails,
    courseId: string
  ): Promise<Result<Course>> {
    const course = {
      courseId,
      courseDetails,
      lessons: [] as Lesson[],
    };
    this.courses.push(course);
    return ok(
      courseSchema.parse({
        courseId,
        details: courseDetails,
        lessons: [],
      })
    );
  }

  async getCourse(courseId: string): Promise<Result<Course>> {
    const course = this.courses.find((c) => c.courseId === courseId);
    if (!course) {
      return err(new CourseNotFoundError(courseId));
    }
    return ok(
      courseSchema.parse({
        courseId: course.courseId,
        details: course.courseDetails,
        lessons: course.lessons.map((lesson) => ({
          lessonId: lesson.lessonId,
          title: lesson.details.title,
          type: lesson.details.content.type,
        })),
      })
    );
  }

  async listCourses(): Promise<Result<Course[]>> {
    return ok(
      this.courses.map((course) =>
        courseSchema.parse({
          courseId: course.courseId,
          details: course.courseDetails,
          lessons: course.lessons.map((lesson) => ({
            lessonId: lesson.lessonId,
            title: lesson.details.title,
            type: lesson.details.content.type,
          })),
        })
      )
    );
  }

  async deleteCourse(courseId: string): Promise<Result<Unit>> {
    const courseIndex = this.courses.findIndex((c) => c.courseId === courseId);
    if (courseIndex === -1) {
      return err(new CourseNotFoundError(courseId));
    }
    this.courses.splice(courseIndex, 1);
    return ok(unit());
  }
}
