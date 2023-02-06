import { avatarDefault } from "@/config";
import { PATH } from "@/config/path";
import useAuth from "@/hooks/useAuth";
import { onLogOut } from "@/stores/authReducer";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Nav from "../Nav";
import Overlay from "../Overlay";

const Header = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    document.body.classList.toggle("menu-is-show");
  };
  const { pathname } = useLocation();
  const closeMenu = () => {
    document.body.classList.remove("menu-is-show");
  };

  useEffect(() => {
    closeMenu();
    setVisible(false);
  }, [pathname]);

  const onClose = () => ({
    onClick: () => {
      setVisible(false);
      closeMenu();
    },
  });
  const onCloseMenu = () => ({
    onClick: () => {
      toggleMenu();
      setVisible(!visible);
    },
  });
  const _logout = (e) => {
    e.preventDefault();
    dispatch(onLogOut());
  };
  return (
    <>
      <header id="header">
        <div className="wrap">
          <div className="menu-hambeger select-none" {...onCloseMenu()}>
            <div className="button">
              <span />
              <span />
              <span />
            </div>
            <span className="text">menu</span>
          </div>

          <Link to={PATH.home} className="logo">
            <img src="/img/logo.svg" alt="" />
          </Link>
          <div className="right">
            {user ? (
              <div className="have-login">
                <div className="account">
                  <Link to={PATH.profile.index} className="info">
                    <div className="name">{user.name}</div>
                    <div className="avatar">
                      <img src={user.avatar || avatarDefault} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="hamberger"></div>
                <div className="sub">
                  <Link to={PATH.profile.course}>Khóa học của tôi</Link>
                  <Link to={PATH.profile.index}>Thông tin tài khoản</Link>
                  <a href="#" onClick={_logout}>
                    Đăng xuất
                  </a>
                </div>
              </div>
            ) : (
              <div className="not-login bg-none">
                <Link to={PATH.signin} className="btn-register">
                  Đăng nhập
                </Link>
                <Link to={PATH.signup} className="btn main btn-open-login">
                  Đăng ký
                </Link>
              </div>
            )}

            {/*  */}
          </div>
        </div>
      </header>
      <Nav {...onClose()} />
      <Overlay {...onClose()} visible={visible} />
    </>
  );
};

export default Header;
