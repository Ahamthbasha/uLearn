import { ICourse } from "../../models/courseModel";
import { IInstructorCourseService } from "../interface/IInstructorCourseService";
import { IInstructorCourseRepository } from "../../repositories/interfaces/IInstructorCourseRepository";

export class InstructorCourseService implements IInstructorCourseService {
  constructor(private courseRepository: IInstructorCourseRepository) {}

  async createCourse(courseData: ICourse): Promise<ICourse> {
    return await this.courseRepository.createCourse(courseData);
  }

  async updateCourse(courseId: string, courseData: Partial<ICourse>): Promise<ICourse | null> {
    return await this.courseRepository.updateCourse(courseId, courseData);
  }

  async deleteCourse(courseId: string): Promise<ICourse | null> {
    return await this.courseRepository.deleteCourse(courseId);
  }

  async getCourseById(courseId: string): Promise<ICourse | null> {
    return await this.courseRepository.getCourseById(courseId);
  }

  async getCoursesByInstructor(instructorId: string): Promise<ICourse[]> {
  return this.courseRepository.getCoursesByInstructor(instructorId);
}

}
