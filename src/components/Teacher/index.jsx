import React from "react";

const Teacher = ({ avatar, title, description, website }) => {
  return (
    <div className="teacher mt-5">
      <div className="avatar">
        <img src={avatar} alt="img" className="object-right" />
      </div>
      <div className="info">
        <div className="name">{title}</div>
        <div className="title">Founder Spacedev &amp; Fullstack developer</div>
        <p
          className="intro"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {website && (
          <p>
            <strong>Website:</strong> <a href="#">{website}</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Teacher;
