import { Accordion } from "@/components/Accordion";
import CourseList from "@/components/CourseList";
import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config/path";
import { useGetCourseDetails } from "@/hooks/useGetCourseDetails";
import useScrollTop from "@/hooks/useScrollTop";
import { formatNumber } from "@/utils/currency";
import React from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import moment from "moment";
import { v4 } from "uuid";
import Teacher from "@/components/Teacher";
import Page404 from "../404";
import Modal from "@/components/Modal";
import { useState } from "react";

const CourseDetails = () => {
  const { course, id, loading } = useGetCourseDetails(useParams);
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  // useScrollTop(id);
  if (loading)
    return (
      <main className="course-detail" id="main">
        <section className="banner style2">
          <div className="container">
            <div className="info">
              <h1 className="w-full">
                <Skeleton width={"100%"} maxWidth={550} height={64} />
              </h1>
              <div className="row">
                <div className="date flex items-center">
                  <strong className="flex-shrink-0">Khai giảng:</strong>{" "}
                  <Skeleton width={90} height={20} />
                </div>
                <div className="time flex items-center">
                  <strong className="flex-shrink-0">Thời lượng:</strong>
                  <Skeleton width={90} height={20} />
                </div>
              </div>
              <div className="btn white round">
                <Skeleton width={139} height={46} borderRadius={100} />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <div className="video">
                <div className="icon">
                  <img src="/img/play-icon-white.png" alt="" />
                </div>{" "}
                <span>giới thiệu</span>
              </div>
              <div className="money">
                <Skeleton width={80} height={26} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );

  if (!course) return <Page404 />;

  const { title, long_description, thumbnailUrl, money, slug } = course;
  const registerPath = generatePath(PATH.courseRegister, {
    slug,
    id,
  });
  const openingTime = course?.opening_time;
  return (
    <main className="course-detail" id="main">
      <section
        className="banner style2"
        style={{
          "--background": course?.template_color_banner || "#cde6fb",
        }}
      >
        <div className="container">
          <div className="info">
            <h1>{title}</h1>
            <div className="row">
              <div className="date">
                <strong>Khai giảng:</strong>{" "}
                {moment(openingTime).format("DD/MM/YYYY")}
              </div>
              <div className="time">
                <strong>Thời lượng:</strong> 18 buổi
              </div>
            </div>
            <Link
              className="btn white round"
              style={{
                "--color-btn": course?.template_color_btn || "#70b6f1",
              }}
              to={registerPath}
            >
              đăng ký
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div
              className="video"
              onClick={() => {
                setVisible(true);
              }}
            >
              <div className="icon">
                <img src="/img/play-icon-white.png" alt="" />
              </div>{" "}
              <span>giới thiệu</span>
            </div>
            <Modal visible={visible} onCancel={onCancel}>
              <iframe
                src="https://www.youtube.com/embed/luImsWaNLAY?autoplay=1"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </Modal>
            <div className="money">{formatNumber(money)}</div>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="container">
          <p className="des">{long_description}</p>
          <h2 className="title">giới thiệu về khóa học</h2>
          <div className="cover">
            <img src={thumbnailUrl} alt="" />
          </div>
          <h3 className="title">nội dung khóa học</h3>

          <Accordion.Group>
            {course?.content?.map((content, id) => (
              <Accordion key={id} date={id + 1} {...content}>
                {content?.content}
              </Accordion>
            ))}
          </Accordion.Group>
          <h3 className="title">yêu cầu cần có</h3>
          <div className="row row-check">
            {course?.required.map((item) => (
              <div className="col-md-6" key={v4()}>
                {item?.content}
              </div>
            ))}
          </div>
          <h3 className="title">hình thức học</h3>
          <div className="row row-check">
            {course?.benefits.map((e) => (
              <div className="col-md-6" key={v4()}>
                {e.content}
              </div>
            ))}
          </div>
          <h3 className="title">
            <div className="date-start">lịch học</div>
            <div className="sub">
              *Lịch học và thời gian có thể thống nhất lại theo số đông học
              viên.
            </div>
          </h3>
          <p>
            <strong>Ngày bắt đầu: </strong>{" "}
            {moment(openingTime).format("DD/MM/YYYY")}
            <br />
            <strong>Thời gian học: </strong> {course?.schedule}
          </p>
          <h3 className="title">Người dạy</h3>
          <div className="teaches">
            <Teacher {...course?.teacher} />
          </div>
          {course?.mentor.length > 0 && (
            <>
              <h3 className="title">Người hướng dẫn</h3>
              <div className="teaches">
                {course?.mentor?.map((e) => (
                  <Teacher {...e} key={v4()} />
                ))}
              </div>
            </>
          )}
          <div className="bottom">
            <div className="user">
              <img src="/img/user-group-icon.png" alt="" /> 12 bạn đã đăng ký
            </div>
            <Link to={registerPath} className="btn main btn-register round">
              đăng ký
            </Link>
            <div className="btn-share btn overlay round btn-icon">
              <img src="/img/facebook.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-4">
        <div className="container">
          <div className="textbox">
            <h3 className="sub-title">Khóa học</h3>
            <h2 className="main-title">Liên quan</h2>
          </div>
          <CourseList related id={id} />
        </div>
      </section>
    </main>
  );
};

export default CourseDetails;
