// import axios from "axios";
// import { makeAutoObservable } from "mobx";

// import agent from "../api/agent";
// import {
//   User,
//   UserFormValuesLogin,
//   UserFormValuesRegister,
// } from "../models/user";
// import { store } from "./store";

export default class UserStore {
//   user: User | null = null;
//   constructor() {
//     makeAutoObservable(this);
//   }

//   getCurrentUser() {
//     return localStorage.getItem("token");
//   }

//   register = async (creds: UserFormValuesRegister) => {
//     try {
//       return axios
//         .post("https://localhost:7260/api/Auth/register", creds)
//         .then((response) => {
//           if (response.data) {
//             localStorage.setItem("token", response.data);
//             let token = localStorage.getItem("token");
//             console.log(token);
//             let jwtData = token!.split(".")[1];
//             let decodedJwtJsonData = window.atob(jwtData);
//             let decodedJwtData = JSON.parse(decodedJwtJsonData);
//             let roles = decodedJwtData.role;
//             localStorage.setItem("role", roles);
//             console.log(roles);
//             {
//               window.location.href = "/login";
//             }
//           }
//           return response.data;
//         });
//     } catch (error) {
//       throw error;
//     }
//   };

//   login = async (creds: UserFormValuesLogin) => {
//     try {
//       return axios
//         .post("https://localhost:7260/api/Auth/login", creds)
//         .then((response) => {
//           if (response.data) {
//             localStorage.setItem("token", response.data);
//             let token = localStorage.getItem("token");
//             console.log(token);
//             let jwtData = token!.split(".")[1];
//             let decodedJwtJsonData = window.atob(jwtData);
//             let decodedJwtData = JSON.parse(decodedJwtJsonData);
//             let roles = decodedJwtData.role;
//             localStorage.setItem("role", roles);
//             console.log(roles);
//             {
//               window.location.href = "/";
//             }
//           }
//           return response.data;
//         });
//     } catch (error) {
//       throw error;
//     }
//   };

//   isAdmin() {
//     const role = localStorage.getItem("role");
//     if (role === "Admin") {
//       return true;
//     }
//   }

//   logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//   };

//   token = localStorage.getItem("token");
}
