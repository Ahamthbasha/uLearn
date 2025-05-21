import mongoose, {Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document{
    _id:ObjectId,
    username:string,
    email:string,
    password:string,
    mobileNo:string,
    role?:string,
    profilePicUrl?:string,
    studiedHours:number,
    isVerified:boolean,
    isBlocked:boolean,
    lastLogin?:Date,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema:Schema<IUser> = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    profilePicUrl:{
        type:String,
        required:false
    },
    studiedHours:{
        type:Number,
        required:false,
        default:0
    },
    isVerified:{
        type:Boolean,
        required:false
    },
    isBlocked:{
        type:Boolean,
        required:false
    }
})

const UserModel = mongoose.model<IUser>('User',userSchema)
export default UserModel
