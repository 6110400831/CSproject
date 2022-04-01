import axios from "axios";

export const createChallenge = async (image: any, json: any) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createChallenge",
    data: {
      image: image,
      json: json,
    },
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("success");
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
  console.log("success");
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
  console.log("success");
  return http;
};

export const getAllChallenge = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllChallenge",
  });
  console.log("success");
  return http;
};

export const compareImage = async (outputImage: any, id: number) => {
  const ans = await axios({
    method: "post",
    url: "http://localhost:8000/api/imageCompare",
    data: {
      image: outputImage,
      id: id,
    },
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("success");
  return ans;
};
