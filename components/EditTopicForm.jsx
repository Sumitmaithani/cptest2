"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import axios from "axios";

export default function EditTopicForm({
  id,
  School,
  Degree,
  FieldOfStudy,
  StartDate,
  EndDate,
  Grade,
  Description,
  Subjects
}) {
  const [NewSchool, setNewSchool] = useState(School);
  const [NewDegree, setNewDegree] = useState(Degree);
  const [NewFieldOfStudy, setNewFieldOfStudy] = useState(FieldOfStudy);
  const [NewStartDate, setNewStartDate] = useState(StartDate);
  const [NewEndDate, setNewEndDate] = useState(EndDate);
  const [NewDescription, setNewDescription] = useState(Description);
  const [NewGrade, setNewGrade] = useState(Grade);
  const [NewSubjects, setNewSubjects] = useState(Subjects);

  React.useEffect(() => {
    setNewSchool(School);
    setNewDegree(Degree);
    setNewFieldOfStudy(FieldOfStudy);
    setNewStartDate(StartDate);
    setNewEndDate(EndDate);
    setNewGrade(Grade);
    setNewDescription(Description);
    setNewSubjects(Subjects);
  }, [
    School,
    Degree,
    FieldOfStudy,
    StartDate,
    EndDate,
    Grade,
    Description,
    Subjects
  ]);

  const router = useRouter();

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setNewSubjects([...NewSubjects, e.target.value]);
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = NewSubjects.filter((tag) => tag !== removedTag);
    setNewSubjects(newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        .put(`/api/topics/${id}`, {
          NewSchool,
          NewDegree,
          NewFieldOfStudy,
          NewStartDate,
          NewEndDate,
          NewGrade,
          NewDescription,
          NewSubjects
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
        onChange={(e) => setNewSchool(e.target.value)}
        value={NewSchool}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="School"
      />
      <input
        onChange={(e) => setNewDegree(e.target.value)}
        value={NewDegree}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Degree"
      />
      <input
        onChange={(e) => setNewFieldOfStudy(e.target.value)}
        value={NewFieldOfStudy}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Field of study"
      />
      <div className="flex items-center text-center">
        <b>Duration :</b>
        <input
          onChange={(e) => setNewStartDate(e.target.value)}
          defaultValue={moment.utc(NewStartDate).format("YYYY-DD-MM")}
          id="datePicker"
          type="date"
          className="border border-slate-500 px-8 py-2 mr-2 ml-3"
        />
        <b> - </b>
        <input
          onChange={(e) => setNewEndDate(e.target.value)}
          value={moment.utc(NewEndDate).format("YYYY-DD-MM")}
          id="datePicker"
          type="date"
          className="border border-slate-500 px-8 py-2 ml-2"
        />
      </div>
      <input
        onChange={(e) => setNewGrade(e.target.value)}
        value={NewGrade}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Grade"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={NewDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      />
      <div className="flex items-center text-center">
        <b>Subjects :</b>
        <div className="tag-container ml-3">
          {NewSubjects?.map((tag, index) => {
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
        Update Education
      </button>
    </div>
  );
}
