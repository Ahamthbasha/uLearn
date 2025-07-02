import { Schema, model, Document, Types } from "mongoose";

export interface IEnrollment extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  enrolledAt: Date;
  completionStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  certificateGenerated: boolean;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },
    completionStatus: {
      type: String,
      enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
      default: "NOT_STARTED",
    },
    certificateGenerated: { type: Boolean, default: false },
  },
  { timestamps: false }
);

export const EnrollmentModel = model<IEnrollment>("Enrollment", enrollmentSchema);
