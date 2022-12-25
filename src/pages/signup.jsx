import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAsync } from "@/hooks/useAsync";
import { useForm } from "@/hooks/useForm";
import useScrollTop from "@/hooks/useScrollTop";
import { userService } from "@/services/user.service";
import handleError from "@/utils/handleError";
import { confirm, min, regex, require } from "@/utils/validate";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import classNames from "classnames";
import React, { useState } from "react";

const Signup = () => {
  const { execute: signupService, loading } = useAsync(userService.signup);

  const { execute: resendService, loading: loadingResend } = useAsync(
    userService.resendEmail
  );
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  useScrollTop(isSignupSuccess);

  const { form, register, validate } = useForm({
    username: [
      require({ message: "Email không được để trống" }),
      regex("email", "Vui lòng điền email đúng"),
    ],
    name: [require({ message: "Họ và tên không được để trống" })],
    password: [
      require({ message: "Mật khẩu không được để trống" }),
      min(10, "Mật khẩu phải có ít nhất 10 ký tự"),
    ],
    confirm: [
      require({ message: "Vui lòng nhập lại mật khẩu" }),
      confirm("password", "Mật khẩu nhập lại chưa chính xác"),
    ],
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      //post
      try {
        const res = await signupService(form);

        if (res?.success) {
          message.success(res?.message);
          setIsSignupSuccess(true);
        }
      } catch (err) {
        handleError(err);
      }
    } else {
      console.log("validate thất bại");
    }
  };

  const onResendEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await resendService({ username: form.username });

      message.success(res?.message);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <main className="auth" id="main">
      {isSignupSuccess ? (
        <div className="wrap flex select-none flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold uppercase">
            Đăng ký tài khoản thành công
          </h1>
          <p className="mt-5 text-xl">
            Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email,
            vui lòng bấm{" "}
            <span className="font-bold ">"Gửi lại email kích hoạt" </span>
            bên dưới
          </p>
          <div className="mt-2 flex select-none items-center gap-2">
            {loadingResend && (
              <LoadingOutlined
                className={classNames("text-[#00afab]", {
                  "opacity-50": loadingResend,
                })}
              />
            )}

            <a
              onClick={onResendEmail}
              href="#"
              className={classNames("link", {
                "pointer-events-none opacity-50": loadingResend,
              })}
            >
              Gửi lại email kích hoạt
            </a>
          </div>
        </div>
      ) : (
        <form className="wrap select-none" onSubmit={onSubmit}>
          <h2 className="title">Đăng ký</h2>

          <Input
            classNameError="text-xs"
            className="mb-4"
            placeholder="Địa chỉ Email"
            {...register("username")}
          />
          <Input
            classNameError="text-xs"
            className="mb-4"
            placeholder="Họ và tên"
            {...register("name")}
          />
          <Input
            classNameError="text-xs"
            className="mb-4"
            placeholder="Mật khẩu"
            type="password"
            {...register("password")}
          />
          <Input
            classNameError="text-xs"
            className="mb-4"
            placeholder="Nhập lại mật khẩu"
            type="password"
            {...register("confirm")}
          />

          <p className="policy">
            Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a>{" "}
            của Spacedev
          </p>
          <Button loading={loading} className="btn-login">
            Đăng ký
          </Button>
        </form>
      )}
    </main>
  );
};

export default Signup;
