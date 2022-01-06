import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const usersEndPoint = "user/";

export const userService = {
  get: async () => {
    const { data } = await httpServices.get(usersEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpServices.put(
      usersEndPoint + payload._id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpServices.get(
      usersEndPoint + localStorageService.getUserId()
    );
    return data;
  },
  updateUser: async (payload) => {
    const { data } = await httpServices.put(
      usersEndPoint + payload._id,
      payload
    );
    return data;
  }
};
