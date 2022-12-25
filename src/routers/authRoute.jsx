import React, { lazy } from "react";
import AuthRoute from "@/components/AuthRouter";
import { PATH } from "@/config/path";

// import Resetpassword from "@/pages/reset-password";
// import Signup from "@/pages/signup";
// import Signin from "@/pages/signin";
// ======================
const Resetpassword = lazy(() => import("@/pages/reset-password"));
const Signin = lazy(() => import("@/pages/signin"));
const Signup = lazy(() => import("@/pages/signup"));

const authRouter = {
  element: <AuthRoute redirect={PATH.profile.index} />,
  children: [
    {
      element: <Signin />,
      path: PATH.signin,
    },
    {
      element: <Signup />,
      path: PATH.signup,
    },
    {
      element: <Resetpassword />,
      path: PATH.resetPassword,
    },
  ],
};

export default authRouter;
