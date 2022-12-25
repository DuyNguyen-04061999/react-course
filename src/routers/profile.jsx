import React, { lazy } from "react";
import PrivateRouter from "@/components/PrivateRouter";
import { PATH } from "@/config/path";
import ProfileLayout from "@/layouts/ProfileLayout";

// import MyProfile from "@/pages/profile";
// import MyCourse from "@/pages/profile/course";
// import MyProject from "@/pages/profile/project";
// import MyPayment from "@/pages/profile/payment";
// import MyCoin from "@/pages/profile/coin";
// =======================
const MyProfile = lazy(() => import("@/pages/profile"));
const MyCoin = lazy(() => import("@/pages/profile/coin"));
const MyCourse = lazy(() => import("@/pages/profile/course"));
const MyPayment = lazy(() => import("@/pages/profile/payment"));
const MyProject = lazy(() => import("@/pages/profile/project"));

const profile = {
  element: <PrivateRouter redirect={PATH.signin} />,
  children: [
    {
      element: <ProfileLayout />,
      path: PATH.profile.index,
      children: [
        { element: <MyProfile />, index: true },
        {
          element: <MyCourse />,
          path: PATH.profile.course,
        },
        {
          element: <MyProject />,
          path: PATH.profile.project,
        },
        {
          element: <MyPayment />,
          path: PATH.profile.payment,
        },
        {
          element: <MyCoin />,
          path: PATH.profile.coin,
        },
      ],
    },
  ],
};

export default profile;
