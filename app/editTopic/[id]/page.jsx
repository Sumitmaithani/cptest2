"use client";

import EditTopicForm from "@/components/EditTopicForm";
import React from "react";
import axios from "axios";

export default function EditTopic({ params }) {
  const { id } = params;
  const [topic, setTopic] = React.useState({});

  const getTopicById = async (id) => {
    try {
      const res = await axios.get(`/api/topics/${id}`);
      setTopic(res.data.topic);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTopicById(id);
  }, []);

  const {
    School,
    Degree,
    FieldOfStudy,
    StartDate,
    EndDate,
    Grade,
    Description,
    Subjects
  } = topic;

  return (
    <EditTopicForm
      id={id}
      School={School}
      Degree={Degree}
      FieldOfStudy={FieldOfStudy}
      StartDate={StartDate}
      EndDate={EndDate}
      Grade={Grade}
      Description={Description}
      Subjects={Subjects}
    />
  );
}
