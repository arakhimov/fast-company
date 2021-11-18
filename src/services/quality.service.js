import httpServices from "./http.service";

const qualityEndPoint = "quality/";

export const qualityService = {
  get: async () => {
    const { data } = await httpServices.get(qualityEndPoint);
    return data;
  }
};
