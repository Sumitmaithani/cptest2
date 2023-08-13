import connectMongoDB from "@/libs/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const course = await Course.findOne({ _id: id });
  return NextResponse.json({ course }, { status: 200 });
}

// export async function PUT(request, { params }) {
//   const { id } = params;

//   const { sectionIndex, moduleIndex } = await request.json(); // Assuming you're sending the sectionIndex and moduleIndex from the request body

//   await connectMongoDB();

//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           [`Content.${sectionIndex}.modules.${moduleIndex}.status`]: "Pass"
//         }
//       },
//       { new: true }
//     );

//     return NextResponse.json(
//       { message: "Course updated", course: updatedCourse },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating module status:", error);
//     return NextResponse.json(
//       { message: "Error updating course" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request, { params }) {
//   const { id } = params;

//   const { competencyIndex } = await request.json(); // Assuming you're sending the competencyIndex from the request body

//   await connectMongoDB();

//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           [`Competencies.${competencyIndex}.status`]: "Pass"
//         }
//       },
//       { new: true }
//     );

//     return NextResponse.json(
//       { message: "Course updated", course: updatedCourse },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating competency status:", error);
//     return NextResponse.json(
//       { message: "Error updating course" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(request, { params }) {
  const { id } = params;

  const { action, sectionIndex, moduleIndex, competencyIndex } =
    await request.json();

  await connectMongoDB();

  if (action === "updateModuleStatus") {
   // const { sectionIndex, moduleIndex } = await request.json(); // Assuming you're sending the sectionIndex and moduleIndex from the request body

    await connectMongoDB();

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        {
          $set: {
            [`Content.${sectionIndex}.modules.${moduleIndex}.status`]: "Pass"
          }
        },
        { new: true }
      );

      return NextResponse.json(
        { message: "Course updated", course: updatedCourse },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating module status:", error);
      return NextResponse.json(
        { message: "Error updating course" },
        { status: 500 }
      );
    }
  } else if (action === "updateCompetencyStatus") {
   // const { competencyIndex } = await request.json(); // Assuming you're sending the competencyIndex from the request body

    await connectMongoDB();

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        {
          $set: {
            [`Competencies.${competencyIndex}.status`]: "Pass"
          }
        },
        { new: true }
      );

      return NextResponse.json(
        { message: "Course updated", course: updatedCourse },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating competency status:", error);
      return NextResponse.json(
        { message: "Error updating course" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
}
