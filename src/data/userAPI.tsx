import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const http = await axios({
      method: "get",
      url: "http://localhost:8000/api/getCurrentUser",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("current_token"),
      },
    });

    return http;
  } catch (error) {
    return null;
  }
};

export const getCurrentUserProgress = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getCurrentUserProgress",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  return http;
};

export const getCurrentProgressCount = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getCurrentProgressCount",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  return http;
};

export const getAllUser = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllUser",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  return http;
};

export const getUser = async (id: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getUser",
    params: {
      id: id,
    },
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  return http;
};
