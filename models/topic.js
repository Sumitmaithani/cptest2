import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    School: String,
    Degree: String,
    FieldOfStudy: String,
    StartDate: Date,
    EndDate: Date,
    Grade: String,
    Description: String,
    Subjects: Array
  },
  {
    timestamps: true
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
