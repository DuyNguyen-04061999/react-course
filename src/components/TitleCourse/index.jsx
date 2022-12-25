import React from "react";
import CourseList from "../CourseList/index";

const TitleCourse = ({ children = "Nội dung khóa học", ...props }) => {
  return (
    <section className="section-1">
      <div className="container">
        <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
        <p className="top-des">{children}</p>
        <div className="textbox" style={{ marginTop: 100 }}>
          <h3 className="sub-title">KHÓA HỌC</h3>
          <h2 className="main-title">OFFLINE</h2>
        </div>
        <CourseList {...props} />
      </div>
    </section>
  );
};

export default TitleCourse;
