import { ICourse } from "../../models/courseModel";

export interface IInstructorCourseRepository {
  createCourse(courseData: ICourse): Promise<ICourse>;
  updateCourse(courseId: string, courseData: Partial<ICourse>): Promise<ICourse | null>;
  deleteCourse(courseId: string): Promise<ICourse | null>;
  getCourseById(courseId: string): Promise<ICourse | null>;
  getCoursesByInstructor(instructorId: string): Promise<ICourse[]>;

  findCourseByNameForInstructor(courseName: string, instructorId: string): Promise<ICourse | null>;
  findCourseByNameForInstructorExcludingId(courseName: string, instructorId: string, excludeId: string): Promise<ICourse | null>;

  publishCourse(courseId:string):Promise<ICourse | null>

}
