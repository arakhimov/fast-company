import { createSlice } from "@reduxjs/toolkit";
import { qualityService } from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: [],
    isLoading: true,
    errors: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesRecieved: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
      state.lastFetch = Date.now();
    },
    qualitiesRequestFailed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecieved, qualitiesRequestFailed } =
  actions;

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesRecieved(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
};

export default qualitiesReducer;
