import React, { lazy, Suspense } from "react";
const Loading = <div>Lodaing~~~</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));
const Kakao = lazy(() => import("../pages/member/KakaoPage"));
const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <Logout />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <Kakao />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
