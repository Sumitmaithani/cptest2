import connectMongoDB from "@/libs/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const courses = await Course.find();
  return NextResponse.json({ courses }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Course deleted" }, { status: 201 });
}
