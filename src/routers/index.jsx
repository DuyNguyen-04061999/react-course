import React, { lazy } from "react";
import { PATH } from "@/config/path";
import MainLayout from "@/layouts/MainLayout";
import authRouter from "./authRoute";
import profile from "./profile";

const Home = lazy(() => import("@/pages"));
const Page404 = lazy(() => import("@/pages/404"));
const Coin = lazy(() => import("@/pages/coin"));
const Contact = lazy(() => import("@/pages/contact"));
const Courses = lazy(() => import("@/pages/course"));
const CourseDetails = lazy(() => import("@/pages/course/[slug]-id[id]"));
const RegisterCourse = lazy(() => import("@/pages/register/[slug]-id[id]"));
const Demo = lazy(() => import("@/pages/demo-react"));
const Faq = lazy(() => import("@/pages/faq"));
const Payment = lazy(() => import("@/pages/payment"));
const Project = lazy(() => import("@/pages/project"));
const Team = lazy(() => import("@/pages/team"));
// ===========================

// import Home from "@/pages";
// import Team from "@/pages/team";
// import CourseDetails from "@/pages/course/[slug]-id[id]";
// import RegisterCourse from "@/pages/register/[slug]-id[id]";
// import Project from "@/pages/project";
// import Contact from "@/pages/contact";
// import Faq from "@/pages/faq";
// import Payment from "@/pages/payment";
// import Coin from "@/pages/coin";
// import Page404 from "@/pages/404";
// import Demo from "@/pages/demo-react";
// import Courses from "@/pages/course";

const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Demo />,
        path: "/demo-react",
      },
      {
        element: <Team />,
        path: PATH.team,
      },
      {
        path: PATH.course,
        children: [{ element: <Courses />, index: true }],
      },
      {
        element: <CourseDetails />,
        path: PATH.courseDetails,
      },
      {
        element: <RegisterCourse />,
        path: PATH.courseRegister,
      },
      {
        element: <Project />,
        path: PATH.project,
      },
      {
        element: <Contact />,
        path: PATH.contact,
      },
      {
        element: <Faq />,
        path: PATH.faq,
      },
      {
        element: <Payment />,
        path: PATH.payment,
      },
      {
        element: <Coin />,
        path: PATH.coin,
      },
      authRouter,
      profile,
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];

export default routers;
