import httpServices from "./http.service";

const usersEndPoint = "user/";

export const userService = {
  get: async () => {
    const { data } = await httpServices.get(usersEndPoint);
    return data;
  },
  create: async (payload) => {
    console.log(payload);
    const { data } = await httpServices.put(
      usersEndPoint + payload._id,
      payload
    );
    console.log(data);
    return data;
  }
};
