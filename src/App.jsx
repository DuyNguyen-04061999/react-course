import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routers from "./routers";
const App = () => {
  // const [user, setUser] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("user"));
  //   } catch (error) {
  //     return null;
  //   }
  // });
  // const login = () =>
  //   setUser({
  //     name: "Nguyen Phuong Duy",
  //     avatar: "/img/avt.png",
  //   });
  // const logout = () => setUser(null);
  // useEffect(() => {
  //   localStorage && localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  const element = useRoutes(routers);
  return <>{element}</>;

  {
    /* <Routes>
        <Route element={<MainLayout user={user} logout={logout} />}>
          <Route index element={<Home />} />
          <Route path={PATH.team} element={<Team />} />

          <Route path={PATH.course}>
            <Route index element={<Courses />} />
          </Route>
          <Route path={PATH.courseDetails} element={<CourseDetails />} />
          <Route path={PATH.courseRegister} element={<RegisterCourse />} />

          <Route path={PATH.project} element={<Project />} />
          <Route path={PATH.contact} element={<Contact />} />
          <Route path={PATH.faq} element={<Faq />} />
          <Route path={PATH.payment} element={<Payment />} />
          <Route path={PATH.coin} element={<Coin />} />

          <Route
            element={<AuthRouter redirect={PATH.profile.index} user={user} />}
          >
            <Route path={PATH.signin} element={<Signin login={login} />} />
            <Route path={PATH.signup} element={<Signup />} />
            <Route path={PATH.resetPassword} element={<Resetpassword />} />
          </Route>

          <Route element={<PrivateRouter user={user} redirect={PATH.signin} />}>
            <Route
              path={PATH.profile.index}
              element={<ProfileLayout user={user} />}
            >
              <Route index element={<MyProfile />} />
              <Route path={PATH.profile.course} element={<MyCourse />} />
              <Route path={PATH.profile.project} element={<MyProject />} />
              <Route path={PATH.profile.payment} element={<MyPayment />} />
              <Route path={PATH.profile.coin} element={<MyCoin />} />
            </Route>
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes> */
  }
};

export default App;
