import { z } from "zod";
import {
  descriptionSchema,
  instructorNameSchema,
  syllabusSchema,
  titleSchema,
} from "./value_objects";

export const courseDetailsSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  syllabus: syllabusSchema,
  instructorName: instructorNameSchema,
});

export type CourseDetails = z.infer<typeof courseDetailsSchema>;

export const lessonDetailsSchema = z.object({
  title: titleSchema,
  content: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("text"),
      body: z.string(),
    }),
    z.object({
      type: z.literal("video"),
      url: z.string().url(),
    }),
  ]),
});

export type LessonDetails = z.infer<typeof lessonDetailsSchema>;

export const lessonSchema = z.object({
  lessonId: z.string(),
  details: lessonDetailsSchema,
  createdAt: z.coerce.date(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonPreviewSchema = z.object({
  lessonId: z.string(),
  title: titleSchema,
  type: z.enum(["text", "video"]),
});

export const courseSchema = z.object({
  courseId: z.string(),
  details: courseDetailsSchema,
  lessons: z.array(lessonPreviewSchema),
});

export type Course = z.infer<typeof courseSchema>;
