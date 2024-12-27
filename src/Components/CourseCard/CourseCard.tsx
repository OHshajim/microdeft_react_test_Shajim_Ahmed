import React from "react";
import "./style.css";
import Image from "next/image";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <Image
        src={course.image}
        alt={course.title}
        width={500}
        height={400}
        className="course-card-image"
      />
      <div className="course-card-content">
        <h2 className="course-card-title">{course.title}</h2>
        <p className="course-card-description">{course.description}</p>
        <div className="course-card-info">
          <span className="course-card-instructor">
            Instructor: {course.instructor_name}
          </span>
          <span className="course-card-created">
            Created: {course.created_at}
          </span>
        </div>
        <div
          className="course-card-badge"
          style={{ backgroundColor: course.badge_color }}
        >
          {course.badge_text}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
