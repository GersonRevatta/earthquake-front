import axios from 'axios';

const baseURL = "http://localhost:3000/api/v1/"; // Reemplaza esto con la URL base de tu API

const http = axios.create({
  baseURL,
});

export default http;
// instance.defaults.xsrfHeaderName = "X-CSRFToken";
// instance.defaults.xsrfCookieName = "csrftoken";
// instance.defaults.withCredentials = true;





// import axios from "axios";
// // import { useSessionUtils } from "./utils/session";

// // const sessionUtils = useSessionUtils();

// const instance = axios.create({
//   baseURL: "http://localhost:3000/api/v1/",
// });

// instance.defaults.xsrfHeaderName = "X-CSRFToken";
// instance.defaults.xsrfCookieName = "csrftoken";
// instance.defaults.withCredentials = true;

// instance.interceptors.request.use(
//   (config) => {
//     if (config.url.startsWith("http")) {
//       return config;
//     }

//     if (config.method !== "options" && localStorage.getItem("token")) {
//       config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.log({ axiosError: error });
//   }
// );
// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response?.status === 401) {
//       // sessionUtils.cleanLocalStorageSession();
//     }
//     return Promise.reject(error);
//   }
// );
// export default instance;
