"use client";

import RemoveBtnCourse from "../../components/RemoveBtnCourse";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import React from "react";
import axios from "axios";
import Link from "next/link";

export default function page() {
  const [topics, setTopics] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  const getCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data.courses);
    } catch (error) {
      console.log("Error loading courses: ", error);
    }
  };

  const getTopics = async () => {
    try {
      const res = await axios.get("/api/topics");
      setTopics(res.data.topics);
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  React.useEffect(() => {
    getCourses();
    getTopics();
  }, []);

  const CompetencyAnalysis = (courseSubjects) => {
    const totalCourseSubjects = courseSubjects.length;
    const matchingSubjects = courseSubjects.filter((subject) =>
      topics.some((obj) => obj.Subjects.includes(subject))
    );
    const totalMatchingSubjects = matchingSubjects.length;

    if (totalMatchingSubjects === totalCourseSubjects) {
      return 100; // All course subjects are present in the topic
    } else if (totalMatchingSubjects === 0) {
      return 0; // None of the course subjects are present in the topic
    } else {
      // Calculate the matching score in the range of 0 to 100
      const matchingScore = (totalMatchingSubjects / totalCourseSubjects) * 100;

      return Math.round(matchingScore);
    }
  };

  const unmatchedSubjects = (courseSubjects) => {
    const matchingSubjects = courseSubjects.filter((subject) =>
      topics.some((obj) => obj.Subjects.includes(subject))
    );

    // Find the unmatched subjects
    const unmatchedSubjects = courseSubjects.filter(
      (subject) => !matchingSubjects.includes(subject)
    );

    if (unmatchedSubjects.length == 0) {
      return "You all good";
    }

    return unmatchedSubjects + " ";
  };

  return (
    <div className=" max-w-3xl mx-auto">
      {courses.map((t) => (
        <div key={t._id}>
          <Link
            href={`/courses/${t._id}`}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div className="flex gap-3">
              <Image src={t.Image} alt="image" width={300} height={300} />
              <div>
                <h2 className="font-bold text-2xl">{t.Name}</h2>
                <div className="flex gap-2">
                  <div>{t.Description}</div>
                </div>
                <div className="flex gap-2">
                  <b>Learning Hours : </b>
                  <div>{t.LearningHours}</div>
                </div>
                <div className="flex items-center ">
                  <div>CP : {CompetencyAnalysis(t.Subjects)}/100 </div>
                  <div className="group relative cursor-pointer py-2 ml-2">
                    <div className="absolute invisible bottom-7 group-hover:visible bg-black text-white px-4 mb-3 py-2 text-sm rounded-md">
                      <p className=" leading-2 text-white-600 pt-2 pb-2">
                        {unmatchedSubjects(t.Subjects)}
                      </p>
                      <svg
                        className="absolute z-10  bottom-[-10px] "
                        width="16"
                        height="10"
                        viewBox="0 0 16 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="black" />
                      </svg>
                    </div>
                    <span className="underline hover:cursor-pointer">
                      <BsInfoCircleFill />
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-center">
                  <div className="tag-containerless">
                    {t.Subjects.map((tag, index) => {
                      return (
                        <div key={index} className="tag">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex gap-2">
              <RemoveBtnCourse id={t._id} />
            </div> */}
          </Link>
        </div>
      ))}
    </div>
  );
}
