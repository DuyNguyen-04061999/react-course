import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config/path";
import { useFetch } from "@/hooks/useFetch";
import { courseService } from "@/services/course.service";
import moment from "moment";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import { v4 } from "uuid";

const MyCourse = () => {
  const { data, loading } = useFetch(courseService.getMyCourse);
  console.log("data :>> ", data);
  return (
    <>
      {loading ? (
        <div className="tab2">
          {new Array(6).fill(null).map((_) => (
            <div className="item" key={v4()}>
              <div className="cover">
                <Skeleton />
              </div>
              <div className="info">
                <Skeleton width={"100%"} height={30} />
                <Skeleton width={200} height={24} />
                <div className="row">
                  <div>
                    <Skeleton width={64} height={21} />
                  </div>
                  <div>
                    <Skeleton width={80} height={21} />
                  </div>
                  <div>
                    <Skeleton width={100} height={21} />
                  </div>
                </div>
                <div className="process gap-5">
                  <Skeleton width={419} height={5} />
                  <Skeleton width={30} height={30} />
                </div>
                <Skeleton width={133} height={46} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="tab2">
          {data?.data?.length === 0 && (
            <p>
              Hiện tại bạn chưa đăng ký khóa học nào, vui lòng đăng ký khóa học
              và quay trở lại
            </p>
          )}
          {data?.data?.map((e) => {
            const { slug, id } = e.course;
            const pathDetail = generatePath(PATH.courseDetails, {
              slug,
              id,
            });
            return (
              <div className="item" key={e.course_id}>
                <Link to={pathDetail} className="cover">
                  <img src={e.course.thumbnailUrl} alt="img" />
                </Link>
                <div className="info">
                  <Link to={pathDetail} href="#" className="name">
                    {e.course.title}
                  </Link>
                  <div className="date">
                    Khai giảng ngày{" "}
                    {moment(e?.course?.opening_time).format("DD/MM/YYYY")}
                  </div>
                  <div className="row">
                    <div>
                      <img src="/img/clock.svg" alt="" className="icon" />
                      54 giờ
                    </div>
                    <div>
                      <img src="/img/play.svg" alt="" className="icon" />
                      {e.course.count_video} video
                    </div>
                    <div>
                      <img src="/img/user.svg" alt="" className="icon" />
                      20 học viên
                    </div>
                  </div>
                  <div className="process">
                    <div className="line">
                      <div className="rate" style={{ width: "30%" }} />
                    </div>
                    30%
                  </div>
                  <Link
                    to={pathDetail}
                    className="btn overlay round btn-continue"
                  >
                    Tiếp tục học
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyCourse;
