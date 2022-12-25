import Button from "@/components/Button";
import Input from "@/components/Input";
import { PATH } from "@/config/path";
import { useAsync } from "@/hooks/useAsync";
import { useForm } from "@/hooks/useForm";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { loginAction } from "@/stores/authReducer";
import { min, regex, require } from "@/utils/validate";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Signin = () => {
  // const { execute: loginService, loading } = useAsync(authService.login);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, validate, form } = useForm({
    username: [
      require({ message: "Địa chỉ email không được để trống" }),
      regex("email"),
    ],
    password: [
      require({ message: "Mật khẩu không được để trống" }),
      min(10, "Mật khẩu phải có ít nhất 10 ký tự"),
    ],
  });
  // const getProfile = async () => {
  //   //get
  //   const user = await userService.getProfile();

  //   return user;
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      dispatch(
        loginAction({
          data: form,
          final: () => {
            setLoading(false);
          },
        })
      );

      // try {
      //   //post
      //   const res = await loginService(form);
      //   if (res?.data) {
      //     setToken(res?.data);
      //     const user = await getProfile();
      //     dispatch({ type: "setUser", payload: user?.data });
      //     setUser(user?.data);
      //     message.success("Đăng nhập tài khoản thành công");
      //   }
      // } catch (err) {
      //   handleError(err);
      // }
    }
  };

  return (
    <main className="auth" id="main">
      <form className="wrap" onSubmit={onSubmit}>
        {/* login-form */}
        <div className="ct_login">
          <h2 className="title">Đăng nhập</h2>
          <Input
            {...register("username")}
            placeholder="Email"
            className="mb-6"
          />
          <Input
            {...register("password")}
            placeholder="Mật khẩu"
            type="password"
            className="mb-6"
          />

          {/* <input type="text" placeholder="Email / Số điện thoại" /> */}
          {/* <input type="password" placeholder="Mật khẩu" /> */}
          <div className="remember">
            <label className="btn-remember">
              <div>
                <input type="checkbox" />
              </div>
              <p>Nhớ mật khẩu</p>
            </label>
            <Link to={PATH.resetPassword} className="forget">
              Quên mật khẩu?
            </Link>
          </div>
          <Button loading={loading} className="btn-login">
            đăng nhập
          </Button>
          {/* <button className="btn rect main btn-login outline-none">
           
          </button> */}
          <div className="text-register">
            <span>Nếu bạn chưa có tài khoản?</span>{" "}
            <Link to={PATH.signup} className="link" href="#">
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Signin;
