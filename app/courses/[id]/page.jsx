"use client";

import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import { PiTelevisionDuotone } from "react-icons/Pi";
import axios from "axios";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const TABLE_HEAD = ["Competency", "Status"];

const page = ({ params }) => {
  const { id } = params;
  const [video, setVideo] = useState("");
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [course, setCourse] = React.useState([]);

  const getCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      console.log(res);
      setCourse(res.data.course);
      setVideo(res.data.course.Content[0].modules[0].link);
    } catch (error) {
      console.log("Error loading courses: ", error);
    }
  };

  const handleCheckboxClick = async (sectionIndex, moduleIndex) => {
    try {
      const res = await axios
        .put(`/api/courses/${id}`, {
          action: "updateModuleStatus",
          sectionIndex,
          moduleIndex
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // Initialize counters
    let totalVideos = 0;
    let passedVideos = 0;
    let nilVideos = 0;

    const content = course.Content;

    content?.forEach((section) => {
      section.modules?.forEach((module) => {
        totalVideos++;

        if (module.status === "Pass") {
          passedVideos++;
        } else if (module.status === "NIL") {
          nilVideos++;
        }
      });
      console.log("Total Videos:", totalVideos);
      console.log("Passed Videos:", passedVideos);
      console.log("NIL Videos:", nilVideos);
    });

    const passPercentage = (passedVideos / totalVideos) * 100;
    console.log("passPercentage", passPercentage);

    const numberOfCompetencies = course.Competencies?.length - 1;

    const competencyIndexToPass = Math.floor(
      passPercentage / (100 / numberOfCompetencies)
    );

    console.log("competencyIndexToPass", competencyIndexToPass);

    // Update competencies

    for (let i = 0; i < competencyIndexToPass; i++) {
      if (course.Competencies[i].status === "NIL") {
        course.Competencies[i].status = "Pass";
        updateCompetencyStatus(i);
      }
    }
  };

  const updateCompetencyStatus = async (competencyIndex) => {
    try {
      const res = await axios
        .put(`/api/courses/${id}`, {
          action: "updateCompetencyStatus",
          competencyIndex
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        <iframe
          width="980"
          height="415"
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="py-6 pl-8">
          <div className="">
            <div className="font-bold text-2xl underline">{course.Name}</div>
            <div className="py-3">
              <div className="font-bold text-lg">Summary</div>
              <p>{course.Summary}</p>
            </div>

            <div className="py-3">
              <div className="font-bold text-lg">Description</div>
              <p>{course.Description}</p>
            </div>

            <div className="py-3">
              <div className="font-bold text-lg">Competencies</div>
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {course.Competencies?.map(({ name, status }, index) => {
                      const isLast = index === course.Competencies.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {status}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="font-bold text-base p-3">Course content</div>
        <hr />

        {course.Content?.map((vid, sectionIndex) => {
          return (
            <Accordion
              className="w-50"
              open={open === sectionIndex + 1}
              icon={<Icon id={sectionIndex + 1} open={open} />}
            >
              <AccordionHeader
                className="p-3 text-lg"
                onClick={() => handleOpen(sectionIndex + 1)}
              >
                {vid.section}
              </AccordionHeader>
              <AccordionBody>
                <Card className="w-96">
                  <List>
                    {vid.modules?.map(
                      ({ link, name, duration, status }, moduleIndex) => {
                        return (
                          <ListItem
                            onClick={() => {
                              setVideo(link);
                            }}
                          >
                            <ListItemPrefix>
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                defaultChecked={status === "Pass"}
                                onClick={() =>
                                  handleCheckboxClick(sectionIndex, moduleIndex)
                                }
                              />
                            </ListItemPrefix>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                {name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal flex items-center gap-2"
                              >
                                <PiTelevisionDuotone /> {duration}
                              </Typography>
                            </div>
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                </Card>
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default page;
