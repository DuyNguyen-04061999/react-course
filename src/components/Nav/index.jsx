import { PATH } from "@/config/path";
import React from "react";
import { NavLink } from "react-router-dom";

const navList = [
  {
    id: 1,
    nav: "Đăng nhập",
    to: PATH.signin,
  },
  {
    id: 2,
    nav: "Đăng ký",
    to: PATH.signup,
  },
  {
    id: 3,
    nav: "Trang chủ",
    to: PATH.home,
  },
  {
    id: 4,
    nav: "Spacedev Team",
    to: PATH.team,
  },
  {
    id: 5,
    nav: "Khóa học",
    to: PATH.course,
  },
  {
    id: 6,
    nav: "Dự án",
    to: PATH.project,
  },
  {
    id: 7,
    nav: "Liên hệ",
    to: PATH.contact,
  },
];
const navList2 = [
  // {
  //   id: 2,
  //   nav: "Thông tin tài khoản",
  //   to: PATH.profile.index,
  // },
  {
    id: 3,
    nav: "Trang chủ",
    to: PATH.home,
  },
  {
    id: 4,
    nav: "Spacedev Team",
    to: PATH.team,
  },
  {
    id: 5,
    nav: "Khóa học",
    to: PATH.course,
  },
  {
    id: 6,
    nav: "Dự án",
    to: PATH.project,
  },
  {
    id: 7,
    nav: "Liên hệ",
    to: PATH.contact,
  },
];

const Nav = ({ onClick }) => {
  return (
    <nav className="nav select-none">
      <ul>
        {navList2.map((navItem) => (
          <li key={navItem.id}>
            <NavLink
              onClick={onClick}
              to={navItem.to}
              className={({ isActive }) =>
                isActive ? "bg-[#00afab] text-white" : ""
              }
            >
              {navItem.nav}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
