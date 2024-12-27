"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";

const Card = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    };
    const token = getCookie("authToken");
    if (token) {
      const dataLoad = async () => {
        const response = await axios.get(
          "https://react-interview.crd4lc.easypanel.host/api/course",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        if (response.data.status) {
          setData(response.data.data.data);
        }
      };
      dataLoad();
    }
  }, []);

  return (
    <div>
      {data.length === 0 && <p id="noData">No Data is available !!!</p>}
      <div>
        <div className="courses-container">
          {data.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
