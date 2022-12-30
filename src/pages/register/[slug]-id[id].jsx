import Button from "@/components/Button";
import Field from "@/components/Field";
import MyCheckbox from "@/components/MyCheckbox";
import MySelect from "@/components/MySelect";
import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config/path";
import { useAsync } from "@/hooks/useAsync";
import useAuth from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useGetCourseDetails } from "@/hooks/useGetCourseDetails";
import useScrollTop from "@/hooks/useScrollTop";
import { courseService } from "@/services/course.service";
import { formatNumber } from "@/utils/currency";
import handleError from "@/utils/handleError";
import { min, regex, require } from "@/utils/validate";
import { message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const RegisterCourse = () => {
  // useScrollTop();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập trước khi đăng ký khóa học");
      navigate(PATH.signin, { state: { redirect: pathname } });
    }
  }, [user]);
  const { course, loading, id } = useGetCourseDetails(useParams);
  const { execute: registerCourseService, loading: loadingRegister } = useAsync(
    courseService.registerCourse
  );
  const { validate, register, form } = useForm(
    {
      name: [require({ message: "Họ và tên không được để trống" })],

      phone: [
        require({ message: "Số điện thoại không được để trống" }),
        regex(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Vui lòng điền số điện thoại đúng định dạng"
        ),
      ],
      email: [
        require({ message: "Email không được để trống" }),
        regex("email", "Vui lòng nhập email đúng định dạng"),
      ],
      website: [regex("website", "Vui lòng điền website đúng định dạng")],
      fb: [regex("facebook", "Vui lòng điền đúng địa chỉ facebook")],
      note: [min(20, "Vui lòng viết ý kiến ít nhất 20 ký tự")],
      payment: [require({ message: "Vui lòng chọn hình thức thanh toán" })],
    },
    {
      name: user?.name,
      email: user?.username,
      fb: user?.fb,
      phone: user?.phone,
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const res = await registerCourseService(form, id);
        if (res?.success) {
          message.success(res?.message);
          setIsSuccess(true);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  if (loading)
    return (
      <main className="register-course" id="main">
        <section>
          <div className="container">
            <div className="wrap container">
              <div className="mb-5 flex flex-col items-center justify-center">
                <Skeleton
                  className="mx-auto mb-5 block"
                  width={70}
                  height={25}
                />
                <Skeleton className="mx-auto block" width={500} height={60} />
              </div>
              <div className="main-info h-6 gap-5">
                <Skeleton height="100%" width={207} />
                <Skeleton height="100%" width={174} />
                <Skeleton height="100%" width={200} />
              </div>
              <Skeleton className="mt-[60px]" height={790} width={720} />
            </div>
          </div>
        </section>
      </main>
    );
  const { title, money } = course;

  // if (!user) {
  //   return <Navigate to={PATH.signin} state={{ redirect: pathname }} />;
  // }
  return (
    <main className="register-course" id="main">
      {isSuccess ? (
        <div className="register-success m-10 text-center">
          <div className="contain">
            <div className="main-title !uppercase">đăng ký thành công</div>
            <p>
              <strong>
                Chào mừng {user?.name} đã trở thành thành viên mới của Spacedev
                Team.
              </strong>
              <br />
              Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>,
              chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook hoặc số
              điện thoại của bạn.
            </p>
          </div>
          <Link to={PATH.profile.course} className="btn main rect mt-5">
            về khóa học của tôi
          </Link>
        </div>
      ) : (
        <section>
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong>
                  {formatNumber(money)}VND
                </div>
              </div>

              <form className="form select-none" onSubmit={onSubmit}>
                <Field
                  label="Họ và tên"
                  required
                  placeholder="Họ và tên"
                  {...register("name")}
                />
                <Field
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  {...register("phone")}
                />
                <Field
                  label="Email"
                  disabled
                  placeholder="Email của bạn"
                  {...register("email")}
                />
                <Field
                  label="Website"
                  placeholder="Đường dẫn website http://"
                  {...register("website")}
                />
                <Field
                  label="URL Facebook"
                  placeholder="https://facebook.com"
                  {...register("fb")}
                />

                <Field
                  label="Sử dụng COIN"
                  {...register("coin")}
                  renderInput={(props) => (
                    <MyCheckbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </MyCheckbox>
                  )}
                />

                <Field
                  label="Hình thức thanh toán"
                  {...register("payment")}
                  options={[
                    { label: "Chuyển khoản", value: "chuyen-khoan" },
                    { label: "Tiền mặt", value: "tien-mat" },
                  ]}
                  placeholder="--- Hình thức thanh toán ---"
                  renderInput={(props) => <MySelect {...props} />}
                />
                <Field
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                  {...register("note")}
                />
                <Button loading={loadingRegister}>đăng ký</Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default RegisterCourse;
