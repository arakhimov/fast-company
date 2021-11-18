import httpServices from "./http.service";

const usersEndPoint = "user/";

export const userService = {
  get: async () => {
    const { data } = await httpServices.get(usersEndPoint);
    return data;
  }
};
