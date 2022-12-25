import { useForm } from "@/hooks/useForm";
import { organizationService } from "@/services/organization.service";
import { min,  regex,  require } from "@/utils/validate";
import React, { useState } from "react";
import { message } from "antd";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { useAsync } from "@/hooks/useAsync";

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { loading, execute } = useAsync(organizationService.contact);

  const { form, register, validate, reset } = useForm({
    name: [require({ message: "Họ và tên không được để trống" })],
    phone: [
      require({ message: "Số điện thoại không được để trống" }),
      regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Vui lòng điền số điện thoại"),
    ],
    email: [require({ message: "Email không được để trống" }), regex("email")],
    website: [
      regex({
        regexPattern: "website",
        message: "Vui lòng nhập đúng địa chỉ website",
      }),
    ],
    title: [require({ message: "Tiêu đề không được để trống" })],
    content: [
      require({ message: "Nội dung không được để trống" }),
      min(10, "Vui lòng điền ít nhất 10 ký tự"),
    ],
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        const res = await execute(form);
        if (res?.success) {
          reset();
          message.success(
            "Bạn đã gửi liên hệ thành công, chúng tôi sẽ xử lý trong thời gian sớm nhất"
          );
          setIsSuccess(true);
        }
      } else {
        console.log("Validate thất bại");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <main className="register-course" id="main">
        <section className="section-1 wrap container">
          {/* <div class="main-sub-title">liên hệ</div> */}
          {isSuccess ? (
            <div className="text-center">
              <h2 className="main-title">LIÊN HỆ THÀNH CÔNG</h2>
              <p className="top-des">
                BẠN ĐÃ LIÊN HỆ THÀNH CÔNG, CHÚNG TÔI SẼ LIÊN LẠC VỚI BẠN TRONG
                THỜI GIAN SỚM NHẤT. XIN CẢM ƠN!
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSuccess(false);
                }}
                className="text-[#00AFAB] text-3xl mt-5 flex justify-center"
              >
                LIÊN HỆ LẠI
              </a>
            </div>
          ) : (
            <>
              <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
              <p className="top-des">
                Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng
                nhau tạo ra những sản phẩm giá trị, cũng như việc hợp tác với
                các đối tác tuyển dụng và công ty trong và ngoài nước.
              </p>
              <form className="form" onSubmit={onSubmit}>
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
                  required
                  placeholder="Email của bạn"
                  {...register("email")}
                />
                <Field
                  label="Website"
                  placeholder="Đường dẫn website http://"
                  {...register("website")}
                />
                <Field
                  label="Tiêu đề"
                  placeholder="Tiêu đề liên hệ"
                  {...register("title")}
                />

                <Field
                  label="Nội dung"
                  required
                  {...register("content")}
                  renderInput={({ error, ...props }) => (
                    <textarea
                      cols={30}
                      rows={10}
                      {...props}
                      className="w-full"
                      style={{ border: error ? "1px solid red" : "" }}
                    />
                  )}
                />
                <Button loading={loading}>liên hệ</Button>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Contact;
