import { createSlice } from "@reduxjs/toolkit";
import { professionService } from "../services/profession.service";

const professionSlice = createSlice({
  name: "professions",
  initialState: {
    entities: [],
    isLoading: true,
    errors: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.isLoading = false;
      state.errors = actions.payload;
    }
  }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
  actions;

export const loadProfessionList = () => async (dispatch) => {
  dispatch(professionsRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionsRecieved(content));
  } catch (error) {
    dispatch(professionsRequestFailed(error.message));
  }
};

export const getProfessionById = (id) => (state) => {
  return state.professions.entities.find((prof) => prof._id === id);
};

export const getProfessions = () => (state) => {
  return state.professions.entities;
};

export const getProfissionLoadingStatus = () => (state) => {
  return state.professions.isLoading;
};

export default professionReducer;
