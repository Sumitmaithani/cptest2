"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddTopic() {
  const [School, setSchool] = useState("");
  const [Degree, setDegree] = useState("");
  const [FieldOfStudy, setFieldOfStudy] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Description, setDescription] = useState("");
  const [Grade, setGrade] = useState("");
  const [Subjects, setSubjects] = useState([]);

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setSubjects([...Subjects, e.target.value]);
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setSubjects(newTags);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        .post("/api/topics", {
          School,
          Degree,
          FieldOfStudy,
          StartDate,
          EndDate,
          Grade,
          Description,
          Subjects
        })
        .then(function (response) {
          console.log(response);
          router.push("/");
          router.refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 my-10 px-40">
      <input
        onChange={(e) => setSchool(e.target.value)}
        value={School}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="School"
      />
      <input
        onChange={(e) => setDegree(e.target.value)}
        value={Degree}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Degree"
      />
      <input
        onChange={(e) => setFieldOfStudy(e.target.value)}
        value={FieldOfStudy}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Field of study"
      />
      <div className="flex items-center text-center">
        <b>Duration :</b>
        <input
          onChange={(e) => setStartDate(e.target.value)}
          value={StartDate}
          id="datePicker"
          type="date"
          className="border border-slate-500 px-8 py-2 mr-2 ml-3"
        />
        <b> - </b>
        <input
          onChange={(e) => setEndDate(e.target.value)}
          value={EndDate}
          id="datePicker"
          type="date"
          className="border border-slate-500 px-8 py-2 ml-2"
        />
      </div>
      <input
        onChange={(e) => setGrade(e.target.value)}
        value={Grade}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Grade"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={Description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      />
      <div className="flex items-center text-center">
        <b>Subjects :</b>
        <div className="tag-container ml-3">
          {Subjects.map((tag, index) => {
            return (
              <div key={index} className="tag">
                {tag} <span onClick={() => removeTag(tag)}>x</span>
              </div>
            );
          })}

          <input placeholder="add here" onKeyDown={addTag} />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Education
      </button>
    </div>
  );
}
