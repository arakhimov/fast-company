import httpServices from "./http.service";

const professionEndPoint = "profession/";

export const professionService = {
  get: async () => {
    const { data } = await httpServices.get(professionEndPoint);
    return data;
  }
};
