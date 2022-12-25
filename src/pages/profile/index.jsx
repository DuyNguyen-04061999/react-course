import Button from "@/components/Button";
import Field from "@/components/Field";
import { useAsync } from "@/hooks/useAsync";
import useAuth from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user.service";
import handleError from "@/utils/handleError";
import { setUser } from "@/utils/token";
import { regex, require } from "@/utils/validate";
import { message } from "antd";
import React from "react";

const MyProfile = () => {
  const { user } = useAuth();
  const { register, form, validate } = useForm({
    name: [require()],
    phone: [require(), regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)],
    fb: [regex("facebook")],
  });
  const { execute: updateInfoService, loading } = useAsync(
    userService.updateInfo
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validate()) {
        const res = await updateInfoService(form);
        if (res?.data) {
          setUser(res?.data);
          message.success("Đã cập nhật thông tin thành công");
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <form className="tab1 select-none" onSubmit={onSubmit}>
      <Field
        {...register("name")}
        placeholder="Nguyễn Văn A"
        label="Họ và tên"
        required
      />
      <Field
        {...register("phone")}
        placeholder="0949******"
        label="Số điện thoại"
        required
      />
      <Field label="Email" required disabled defaultValue={user?.username} />
      <Field
        {...register("fb")}
        placeholder="Facebook url"
        label="Facebook"
        required
      />
      <Button loading={loading}>Lưu lại</Button>
    </form>
  );
};

export default MyProfile;
// const { user, setUser } = useAuthContext();
// const { execute: updateInfoService, loading } = useAsync(
//   userService.updateInfo
// );

// const { register, validate, form } = useForm({
//   name: [require()],
//   phone: [require(), regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)],
//   fb: [require(), regex("facebook")],
// });

// const onSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     if (validate()) {
//       //post
//       const res = await updateInfoService(form);
//       if (res?.data) {
//         setUser(res?.data);
//         message.success("Thông tin đã được cập nhật thành công");
//       }
//       console.log("res :>> ", res);
//     }
//   } catch (err) {
//     handleError(err);
//   }
// };
