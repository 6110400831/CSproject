import axios from "axios";

export const createChapter = async (name: string, description: string) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createChapter",
    data: {
      name: name,
      description: name,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });
  return http;
};

export const updateChapter = async (
  id: number,
  name: string,
  description: string
) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/updateChapter",
    data: {
      id: id,
      name: name,
      description: description,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("current_token"),
    },
  });
  return http;
};

export const getChapter = async (id: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getChapter",
    params: {
      id: id,
    },
  });
  return http;
};

export const getAllChapter = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllChapter",
  });
  return http;
};

export const getAllChallengeThisChapter = async (chapterId: number) => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getChapterChallenges?id=1",
    params: {
      id: chapterId,
    },
  });
  return http;
};
