import axios from "axios";

export const createChapter = async (json: any) => {
  const http = await axios({
    method: "post",
    url: "http://localhost:8000/api/createChapter",
    data: {
      json: json,
    },
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("success");
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
  console.log("success");
  return http;
};

export const getAllChapter = async () => {
  const http = await axios({
    method: "get",
    url: "http://localhost:8000/api/getAllChapter",
  });
  console.log("success");
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
  console.log("success");
  return http;
};
