import axios from "axios";
import { getCurrentUserProgress } from "./userAPI";

export const register = async (
  name: any,
  role: any,
  email: any,
  password: any,
  confirmPassword: any
) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/register",
    data: {
      name: name,
      role: role,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    },
  });
  return http;
};

export const login = async (email: any, password: any) => {
  try {
    const http = await axios({
      method: "post",
      url: "http://localhost:8000/api/login",
      data: {
        email: email,
        password: password,
      },
    });

    console.log("login success");
    return http;
  } catch {
    console.log("login fail");
    return null;
  }
};

export const logout = async () => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/logout",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  sessionStorage.removeItem("finished_challenge");
  sessionStorage.removeItem("current_token");
  console.log("logout success");
  return http;
};
