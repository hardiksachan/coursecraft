import { CourseStore } from "@course/ports";
import {
  createCourseProvider,
  createCourseRequestSchema,
  deleteCourseProvider,
  deleteCourseRequestSchema,
  getCourseProvider,
  getCourseRequestSchema,
  listCoursesProvider,
  updateCourseProvider,
  updateCourseRequestSchema,
} from "@course/usecase";
import express from "express";
import { sendCourseDomainError } from "../client-error";
import { requiresAdminPriviliges } from "../middleware";

export const coursesRouter = (courseStore: CourseStore) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const listCourses = listCoursesProvider(courseStore);
    const result = await listCourses(req.ctx);
    if (result.ok) {
      res.status(200).send(result.data);
    } else {
      sendCourseDomainError(res, result.error);
    }
  });

  router.post("/", requiresAdminPriviliges(), async (req, res) => {
    const createCourseRequest = createCourseRequestSchema.parse(req.body);
    const createCourse = createCourseProvider(courseStore);
    const result = await createCourse(req.ctx, createCourseRequest);
    if (result.ok) {
      res.status(201).send();
    } else {
      sendCourseDomainError(res, result.error);
    }
  });

  router.get("/:courseId", async (req, res) => {
    const getCourseRequest = getCourseRequestSchema.parse({
      courseId: req.params.courseId,
    });
    const getCourse = getCourseProvider(courseStore);
    const result = await getCourse(req.ctx, getCourseRequest);
    if (result.ok) {
      res.status(200).send(result.data);
    } else {
      sendCourseDomainError(res, result.error);
    }
  });

  router.put("/:courseId", requiresAdminPriviliges(), async (req, res) => {
    const updateCouseRequst = updateCourseRequestSchema.parse({
      courseId: req.params.courseId,
      courseDetails: req.body,
    });
    const updateCourse = updateCourseProvider(courseStore);
    const result = await updateCourse(req.ctx, updateCouseRequst);
    if (result.ok) {
      res.status(200).send(result.data);
    } else {
      sendCourseDomainError(res, result.error);
    }
  });

  router.delete("/:courseId", requiresAdminPriviliges(), async (req, res) => {
    const deleteCourseRequest = deleteCourseRequestSchema.parse({
      courseId: req.params.courseId,
    });
    const deleteCourse = deleteCourseProvider(courseStore);
    const result = await deleteCourse(req.ctx, deleteCourseRequest);
    if (result.ok) {
      res.status(204).send();
    } else {
      sendCourseDomainError(res, result.error);
    }
  });

  return router;
};
