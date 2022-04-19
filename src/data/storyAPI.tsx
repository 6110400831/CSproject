import axios from "axios";

export const createStory = async (image: any, json: any) => {
  console.log(image, json);
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createStory",
    data: {
      image: image,
      json: json,
    },
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });

  return http;
};

export const getAllStory = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllStory",
  });

  return http;
};

export const getStory = async (id: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getStory",
    params: {
      id: id,
    },
  });

  return http;
};
