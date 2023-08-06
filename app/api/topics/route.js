import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    School,
    Degree,
    FieldOfStudy,
    StartDate,
    EndDate,
    Grade,
    Description,
    Subjects
  } = await request.json();
  await connectMongoDB();
  await Topic.create({
    School,
    Degree,
    FieldOfStudy,
    StartDate,
    EndDate,
    Grade,
    Description,
    Subjects
  });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 201 });
}
