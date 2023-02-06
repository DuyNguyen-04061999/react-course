import React from "react";
import CourseCard from "../CourseCard";
import Skeleton from "../Skeleton";
import { v4 } from "uuid";
import { useFetch } from "@/hooks/useFetch";
import { courseService } from "@/services/course.service";
import { useQuery } from "@/hooks/useQuery";
import createArray from "@/utils/createArray";
import { TEN_SECONDS } from "@/config";

const CourseList = ({ limit = null, related = false, id }) => {
  const { data: { data: courses = [] } = {}, loading } = related
    ? useQuery({
        queryFn: () => courseService.getCourseRelated(id),
        queryKey: "courses-related",
        cacheTime: TEN_SECONDS,
        storeDriver: "sessionStorage",
      })
    : limit
    ? useQuery({
        queryFn: () => courseService.getCourses(limit),
        queryKey: "courses-index",
        cacheTime: TEN_SECONDS,
        storeDriver: "sessionStorage",
      })
    : useQuery({
        queryFn: () => courseService.getCourses(),
        queryKey: "courses-list",
        cacheTime: TEN_SECONDS,
        storeDriver: "sessionStorage",
      });

  return (
    <>
      <div className="list row">
        {!loading
          ? courses?.map((course) => <CourseCard key={course.id} {...course} />)
          : createArray(6).map(() => <CourseCardSkeleton key={v4()} />)}
      </div>
    </>
  );
};

const CourseCardSkeleton = () => {
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <a className="cover cursor-pointer">
          <Skeleton position="absolute" left={0} top={0} />
        </a>
        <div className="info flex flex-col">
          <a className="name mb-4 block h-5 cursor-pointer">
            <Skeleton />
          </a>
          <p className="des flex-1">
            <Skeleton />
          </p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar h-[36px] flex-shrink-0 overflow-hidden rounded-full">
              <Skeleton />
            </div>
            <div className="name h-5 w-[100px]">
              <Skeleton />
            </div>
          </div>
          <div className="register-btn pointer-events-none">Đăng ký</div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
