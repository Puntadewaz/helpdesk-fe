// import axios from 'axios'
import configure from "@configs/configUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "userManagement/getUsers",
  async () => {
    // const response = await axios.get(`${configure.API_BASE_URL}/v1/users`, {
    //   headers: {

    //   }
    // })
    const response = await fetch(`${configure.API_BASE_URL}/v1/users`);
    if (!response.ok)
      throw new Error("Something went wrong with fetching data");
    const data = await response.json();
    console.log(data);
    return {
      data,
    };
  }
);

export const apiCreateUser = createAsyncThunk(
  "userManagement/apiCreateUser",
  async (params) => {
    const response = await fetch(`${configure.API_BASE_URL}/v1/users`, {
      method: "POST",
      body: JSON.stringify(params.newUser),
    });
    if (!response.ok) throw new Error("Something went wrong with posting data");
    const data = await response.json();
    // console.log(data)
    return {
      data,
    };
  }
);

export const userManagement = createSlice({
  name: "userManagement",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    // .addCase(createUser.fulfilled, (state, action) => {
    //     state.data = action.payload.data
    // })
  },
});

export const { saveUser } = userManagement.actions;

export default userManagement.reducer;
