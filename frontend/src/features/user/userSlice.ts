import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import swal from 'sweetalert';

type initialStateTypes = {
  user: null | {
    name: string;
    email: string;
  };
  isLoading: boolean;
};

const initialState: initialStateTypes = {
  user: null,
  isLoading: false,
};

const baseURL = 'http://localhost:5000';

export const signup = createAsyncThunk(
  'user/signup',
  async (
    userData: {
      name: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const signupURL = `${baseURL}/api/user/signup`;

    try {
      const response = await fetch(signupURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response) throw Error("Something's wrong");

      const data = await response.json();

      if (data.error) throw Error(data.error.message);

      return data;
    } catch (error: any) {
      throw rejectWithValue({ name: error.name, message: error.message });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // signup
      .addCase(signup.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          {
            payload,
          }: {
            payload: {
              user: {
                name: string;
                email: string;
              };
              token: string;
            };
          }
        ) => {
          state.user = payload.user;

          state.isLoading = false;
          swal({
            icon: 'success',
            title: 'Signup successfully!',
            text: 'You will redirect to home page',
          });
        }
      )
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        swal({
          icon: 'error',
          title: action.payload.name,
          text: action.payload.message,
        });
      });
  },
});

export default userSlice.reducer;
