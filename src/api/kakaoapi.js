import { combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

const rest_api_key = "e6e603e342dbabd985e30297d6a48c04";
const redirect_url = `http://localhost:3000/member/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;

  return kakaoURL;
};

export const getToken = async (authcode) => {
  const header = {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_url,
    code: authcode,
  };
  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};
