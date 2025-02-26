import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getToken } from "../../api/kakaoapi";

const KakaoPage = () => {
  const [serchParams] = useSearchParams();
  const authCode = serchParams.get("code");
  useEffect(() => {
    getToken(authCode).then((i) => {
      console.log(i);
    });
  }, [authCode]);

  return (
    <div>
      <div>KakaoPage</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoPage;
