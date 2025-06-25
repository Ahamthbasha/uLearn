import { CourseModel, ICourse } from "../../models/courseModel";
import { GenericRepository } from "../genericRepository";
import { IInstructorCourseRepository } from "../interfaces/IInstructorCourseRepository";

export class InstructorCourseRepository
  extends GenericRepository<ICourse>
  implements IInstructorCourseRepository
{
  constructor() {
    super(CourseModel);
  }

  async createCourse(courseData: ICourse): Promise<ICourse> {
    return await this.create(courseData);
  }

  async updateCourse(courseId: string, courseData: Partial<ICourse>): Promise<ICourse | null> {
    return await this.update(courseId, courseData); // ✅ using GenericRepository method
  }

  async deleteCourse(courseId: string): Promise<ICourse | null> {
    return await this.delete(courseId); // ✅ using GenericRepository method
  }

  async getCourseById(courseId: string): Promise<ICourse | null> {
    return await this.findByIdWithPopulate(courseId,{
      path:'category',
      select:'categoryName'
    }); // ✅ using GenericRepository method
  }

  async getCoursesByInstructor(instructorId: string): Promise<ICourse[]> {
  return await this.findAll(
    { instructorId },
    { path: 'category', select: 'categoryName' }
  ) as ICourse[];
}


}
