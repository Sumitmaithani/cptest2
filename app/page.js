"use client";

import TopicsList from "@/components/TopicsList";
import React from "react";
import axios from "axios";

export default function Home() {
  const [topics, setTopics] = React.useState([]);

  const getTopics = async () => {
    try {
      const res = await axios.get("/api/topics");
      setTopics(res.data.topics);
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  React.useEffect(() => {
    getTopics();
  }, [topics]);

  return <TopicsList topics={topics} />;
}
