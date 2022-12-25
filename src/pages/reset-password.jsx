import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAsync } from "@/hooks/useAsync";
import useAuth from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user.service";
import handleError from "@/utils/handleError";
import { setToken } from "@/utils/token";
import { confirm, min, require } from "@/utils/validate";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Resetpassword = () => {
  const [searchParam] = useSearchParams();
  const { getProfile } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const code = searchParam.get("code");

  const { execute: sendEmailService, loading: sendEmailLoading } = useAsync(
    userService.sendEmailResetPassword
  );
  const { execute: resetPasswordService, loading: resetPasswordLoading } =
    useAsync(userService.resetPasswordByCode);

  const emailForm = useForm({
    username: [require({ message: "Vui lòng điền email đã đăng ký" })],
  });
  const passwordForm = useForm({
    password: [
      require({ message: "Vui lòng nhập mật khẩu mới" }),
      min(10, "Mật khẩu phải có ít nhất 10 kí tự"),
    ],
    confirm: [
      require({ message: "Vui lòng nhập lại mật khẩu" }),
      confirm("password", "Mật khẩu nhập lại chưa chính xác"),
    ],
  });

  const onSendEmail = async (e) => {
    e.preventDefault();
    try {
      if (emailForm.validate()) {
        const res = await sendEmailService(emailForm.form);
        if (res?.message) {
          setIsSuccess(true);
          message.success(res?.message);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (passwordForm.validate()) {
        const res = await resetPasswordService({ ...passwordForm.form, code });
        if (res?.data) {
          setToken(res?.data);
          getProfile();
        }
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <main className="auth" id="main">
      {code ? (
        <form className="wrap select-none" onSubmit={onResetPassword}>
          <h2 className="title">Xác nhận mật khẩu</h2>
          <Input
            {...passwordForm.register("password")}
            placeholder="Mật khẩu"
            classNameError="text-xs"
            type="password"
            className="mb-4"
          />
          <Input
            {...passwordForm.register("confirm")}
            placeholder="Nhập lại mật khẩu"
            classNameError="text-xs"
            type="password"
            className="mb-4"
          />
          <Button loading={resetPasswordLoading}>Xác nhận</Button>
        </form>
      ) : isSuccess ? (
        <div className="container flex max-w-2xl flex-col items-center justify-center py-10 text-center">
          <h1 className="mb-2 text-2xl font-bold uppercase">
            Chúng tôi đã gửi email lấy lại mật khẩu cho bạn
          </h1>
          <p className="text-xl">
            Vui lòng kiểm tra email. Nếu vẫn chưa nhận được email, bấm <br />
            <strong>Gửi lại</strong> ở bên dưới
          </p>

          <button
            className="mt-5 flex items-center justify-center gap-3 text-center"
            onClick={onSendEmail}
          >
            {sendEmailLoading && <LoadingOutlined style={{ fontSize: 20 }} />}
            <span className="text-xl font-bold text-[#00AFAB]">Gửi lại</span>
          </button>
        </div>
      ) : (
        <form className="wrap" onSubmit={onSendEmail}>
          <h2 className="title">Đặt lại mật khẩu</h2>
          <Input
            {...emailForm.register("username")}
            placeholder="Email"
            classNameError="text-xs"
          />
          <Button loading={sendEmailLoading} className="btn-next mt-4">
            Tiếp theo
          </Button>
        </form>
      )}
    </main>
  );
};

export default Resetpassword;
