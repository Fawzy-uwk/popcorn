import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
};

const HomeSlice = createSlice({
  name: "home",
  initialState,

  reducers: {
    ApiConfig(state, action) {
      state.url = action.payload;
    },
    getGenres(state, action) {
      state.genres = action.payload;
    },
  },
});

export const { ApiConfig, getGenres } = HomeSlice.actions;
export default HomeSlice.reducer;
