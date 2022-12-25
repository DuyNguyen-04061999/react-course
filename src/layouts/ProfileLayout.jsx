import { avatarDefault } from "@/config";
import { PATH } from "@/config/path";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const profileList = [
  {
    id: 1,
    content: "Thông tin tài khoản",
    to: PATH.profile.index,
  },
  {
    id: 2,
    content: "Khóa học của bạn",
    to: PATH.profile.course,
  },
  {
    id: 3,
    content: "Dự án đã làm",
    to: PATH.profile.project,
  },
  {
    id: 4,
    content: "Lịch sử thanh toán",
    to: PATH.profile.payment,
  },
  {
    id: 5,
    content: "Quản lý COIN của tôi",
    to: PATH.profile.coin,
  },
];
const ProfileLayout = () => {
  const { user } = useAuth();
  return (
    <main className="profile" id="main">
      <section>
        <div className="top-info">
          <div className="avatar">
            <img src={user?.avatar || avatarDefault} alt="img" />
            <div className="camera" />
          </div>
          <div className="name">{user.name}</div>
          <p className="des">Thành viên của team Spacedev1-OFFLINE</p>
        </div>

        <div className="container">
          <div className="tab">
            <div className="tab-title">
              {profileList.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  end={item.to === PATH.profile.index ? true : false}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.content}
                </NavLink>
              ))}
            </div>

            <div className="tab-content">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileLayout;
