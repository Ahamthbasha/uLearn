import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface Instructor{
    userId : string | null,
    name : string | null,
    email : string | null,
    role : string | null,
    isBlocked : string | null,
    profilePicture: string | null
}

const initialState : Instructor ={
    userId : null,
    name: null,
    email: null,
    role: null,
    isBlocked: null,
    profilePicture: null
}

const instructorSlice = createSlice({
    name:"instructor",
    initialState,
    reducers:{
        setInstructor:(state,action:PayloadAction<Instructor>)=>{
            const {userId,name,email,role,isBlocked,profilePicture} = action.payload

            state.userId = userId
            state.name = name
            state.email = email
            state.role = role
            state.isBlocked = isBlocked
            state.profilePicture = profilePicture

            localStorage.setItem('instructor',JSON.stringify(state))
        },

        clearInstructorDetails:(state)=>{
            state.userId = null
            state.name = null
            state.email = null
            state.role = null
            state.isBlocked = null
            state.profilePicture = null


            localStorage.removeItem('instructor')
        }
    }
})

export const {setInstructor,clearInstructorDetails} = instructorSlice.actions
export default instructorSlice.reducer