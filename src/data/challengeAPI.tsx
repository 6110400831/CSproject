import axios from "axios";

export const createChallenge = async (
  name: any,
  description: any,
  hint: any,
  id: any,
  image: any
) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createChallenge",
    data: {
      name: name,
      description: description,
      hint: hint,
      chapter_id: id,
      image: image,
    },
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });
  return http;
};

export const updateChallenge = async (
  id: any,
  name: any,
  description: any,
  hint: any,
  image?: any
) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/updateChallenge",
    data: {
      id: id,
      name: name,
      description: description,
      hint: hint,
      ...(image ? { image: image } : {}),
    },
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });
  return http;
};

export const getChallenge = async (id: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getChallenge",
    params: {
      id: id,
    },
  });
  return http;
};

export const getChallengeImage = async (id: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getChallenge",
    params: {
      id: id,
    },
  });
  return http;
};

export const getAllChallenge = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllChallenge",
  });
  return http;
};

export const compareImage = async (
  outputImage: any,
  finished: any[],
  id: number
) => {
  const ans = await axios({
    method: "post",
    url: "http://localhost:8000/api/imageCompare",
    data: {
      id: id,
      finished: finished,
      image: outputImage,
    },
    headers: {
      "Content-type": "application/json",
      Authorization: sessionStorage.getItem("current_token")
        ? "Bearer " + sessionStorage.getItem("current_token")
        : false,
    },
  });
  return ans;
};
