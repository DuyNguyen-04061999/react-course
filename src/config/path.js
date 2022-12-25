const PROFILE_PATH = "/profile";
const COURSE_PATH = "/courses";
export const PATH = {
  home: "/",
  team: "/team",
  course: COURSE_PATH,
  courseDetails: COURSE_PATH + "/:slug-id:id",
  courseRegister: "/register-course/:slug-id:id",
  project: "/project",
  contact: "/contact",
  faq: "/faq",
  payment: "/payment",
  coin: "/coin",
  signin: "/signin",
  signup: "/signup",
  resetPassword: "/reset-password",
  
  profile: {
    index: PROFILE_PATH,
    course: PROFILE_PATH + "/course",
    project: PROFILE_PATH + "/project",
    payment: PROFILE_PATH + "/payment",
    coin: PROFILE_PATH + "/coin",
  },
};
