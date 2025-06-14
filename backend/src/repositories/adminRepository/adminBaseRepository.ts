import UserModel , {IUser} from "../../models/userModel";
import InstructorModel ,{IInstructor} from "../../models/instructorModel";
import { IAdminBaseRepository } from "../interfaces/IAdminBaseRepository";

export class AdminBaseRespository implements IAdminBaseRepository{

//fetch all users and instructors

    async getAllUsers(): Promise<IUser[] | null> {
    try {
        const users = await UserModel.find() 

        console.log("All users admin base repo",users)
        
        return users
    } catch (error) {
        throw error
    }    
    }

    async getAllInstructors(): Promise<IInstructor[] | null> {
        try {
            const instructors = await InstructorModel.find()
            console.log('all instructors in admin base repo',instructors)

            return instructors 

        } catch (error) {
            throw error
        }
    }

 //get specified data based on email   

    async getUserData(email: string): Promise<IUser | null> {
        try {
            const userData = await UserModel.findOne({email:email})
    
            return userData
        } catch (error) {
            throw error
        }
    }

    async getInstructorData(email: string): Promise<IInstructor | null> {
        try {
            const instructorData = await InstructorModel.findOne({email:email})
            return instructorData
        } catch (error) {
            throw error
        }
    }

//block or unblock 

    async updateProfile(email: string, data: any): Promise<any> {
        try {
            const response = await UserModel.findOneAndUpdate(
                {email},
                {$set:data},
                {new:true}
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async updateInstructorProfile(email: string, data: any): Promise<any> {
        try {
            const response = await InstructorModel.findOneAndUpdate(
                {email},
                {$set:data},
                {new:true}
            )

            return response
        } catch (error) {
            throw error
        }
    }
}