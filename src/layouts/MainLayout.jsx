import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback=<div className="mt-60 flex items-center justify-center">
          <Spin size="large" />
        </div>
      >
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default MainLayout;
