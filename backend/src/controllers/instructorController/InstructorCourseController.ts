import { Request, Response, NextFunction } from "express";
import { IInstructorCourseController } from "./interfaces/IInstructorCourseController";
import { IInstructorCourseService } from "../../services/interface/IInstructorCourseService";
import getId from "../../utils/getId";
import { StatusCode } from "../../utils/enums";
import { CourseErrorMessages, CourseSuccessMessages } from "../../utils/constants";
import { uploadToS3Bucket } from "../../utils/s3Bucket";
import { getPresignedUrl } from "../../utils/getPresignedUrl";

export class InstructorCourseController implements IInstructorCourseController {
  constructor(private courseService: IInstructorCourseService) {}

  async createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courseData = req.body;
      console.log(courseData)
      const instructorId = await getId(req);

      const files = req.files as {
        demoVideos?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
      };

      if (!files?.thumbnail || !files?.demoVideos) {
        res.status(StatusCode.BAD_REQUEST).json({ message: CourseErrorMessages.MISSING_FILES });
        return;
      }

      const thumbnailKey = await uploadToS3Bucket(files.thumbnail[0], "thumbnails");
      const demoVideoKey = await uploadToS3Bucket(files.demoVideos[0], "demoVideos");

      courseData.instructorId = instructorId;
      courseData.thumbnailUrl = thumbnailKey;
      courseData.demoVideo = {
        type: "video",
        url: demoVideoKey,
      };

      const createdCourse = await this.courseService.createCourse(courseData);
      console.log(createdCourse)
      res.status(StatusCode.CREATED).json({
        success: true,
        message: CourseSuccessMessages.COURSE_CREATED,
        data: createdCourse,
      });
    } catch (error) {
      next(error);
    }
  }

async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseId } = req.params;
    const courseData = req.body;

    const files = req.files as {
      demoVideos?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    };

    if (files?.thumbnail) {
      const thumbnailKey = await uploadToS3Bucket(files.thumbnail[0], "thumbnails");
      courseData.thumbnailUrl = thumbnailKey;
    }

    if (files?.demoVideos) {
      const demoVideoKey = await uploadToS3Bucket(files.demoVideos[0], "demoVideos");
      courseData.demoVideo = {
        type: "video",
        url: demoVideoKey,
      };
    }

    const updatedCourse = await this.courseService.updateCourse(courseId, courseData);

    if (!updatedCourse) {
      res.status(StatusCode.NOT_FOUND).json({
        success: false,
        message: CourseErrorMessages.COURSE_NOT_FOUND,
      });
      return;
    }

    // ✅ Generate signed URLs for thumbnail and demo video
    const thumbnailSignedUrl = updatedCourse.thumbnailUrl
      ? await getPresignedUrl(updatedCourse.thumbnailUrl)
      : null;

    const demoVideoSignedUrl =
      updatedCourse.demoVideo?.url
        ? await getPresignedUrl(updatedCourse.demoVideo.url)
        : null;

    res.status(StatusCode.OK).json({
      success: true,
      message: CourseSuccessMessages.COURSE_UPDATED,
      data: {
        ...updatedCourse.toObject(),
        thumbnailSignedUrl,
        demoVideo: {
          ...updatedCourse.demoVideo,
          urlSigned: demoVideoSignedUrl,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}



  async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { courseId } = req.params;
      const deleted = await this.courseService.deleteCourse(courseId);
      if (!deleted) {
        res.status(StatusCode.NOT_FOUND).json({ message: CourseErrorMessages.COURSE_NOT_FOUND });
        return;
      }
      res.status(StatusCode.OK).json({
        success: true,
        message: CourseSuccessMessages.COURSE_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  
async getCourseById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseId } = req.params;
    const course = await this.courseService.getCourseById(courseId);

    if (!course) {
      res.status(StatusCode.NOT_FOUND).json({ message: CourseErrorMessages.COURSE_NOT_FOUND });
      return;
    }

    const courseObj = course.toObject();
    console.log(courseObj)
    // ✅ Generate signed thumbnail URL
    const thumbnailSignedUrl = courseObj.thumbnailUrl
      ? await getPresignedUrl(courseObj.thumbnailUrl)
      : null;

    // ✅ Generate signed demo video URL
    const demoVideoSignedUrl =
      courseObj.demoVideo?.url ? await getPresignedUrl(courseObj.demoVideo.url) : null;

    // ✅ Add signed URLs to response
    const responseData = {
      ...courseObj,
      thumbnailSignedUrl,
      demoVideo: {
        ...courseObj.demoVideo,
        urlSigned: demoVideoSignedUrl,
      },
    };

    res.status(StatusCode.OK).json({ success: true, data: responseData });
  } catch (error) {
    next(error);
  }
}

  async getInstructorCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const instructorId = await getId(req);
    if (!instructorId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const courses = await this.courseService.getCoursesByInstructor(instructorId);

    const coursesWithSignedUrl = await Promise.all(
      courses.map(async (course) => {
        const signedUrl = await getPresignedUrl(course.thumbnailUrl);
        const courseObj = course.toObject();

        return {
          ...courseObj,
          thumbnailSignedUrl: signedUrl,
          categoryName: courseObj.category?.categoryName , // ✅ Extract populated name
        };
      })
    );

    res.status(200).json({ success: true, data: coursesWithSignedUrl });
  } catch (err) {
    next(err);
  }
}


}
