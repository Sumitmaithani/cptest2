import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    Name: String,
    Category: String,
    Image: String,
    Description: String,
    Subjects: Array,
    LearningHours: String
  },
  {
    timestamps: true
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;
