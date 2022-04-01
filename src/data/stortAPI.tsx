import axios from "axios";

export const createStory = async (image: any, json: any) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createStory",
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

export const getAllStory = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllStory",
  });

  return http;
};
