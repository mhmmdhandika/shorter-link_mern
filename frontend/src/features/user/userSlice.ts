import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import useLocalStorage from '@/hooks/useLocalStorage';

type initialStateTypes = {
  user: null | {
    name: string;
    email: string;
    user_id: string;
  };
  token: null | string;
  isLoading: boolean;
  readonly keyStorage: 'SHORTER_LINK__USER';
};

const initialState: initialStateTypes = {
  user: null,
  token: null,
  isLoading: false,
  keyStorage: 'SHORTER_LINK__USER',
};

const baseURL = 'http://localhost:5000/api/user/';

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
    const signupURL = `${baseURL}/signup`;

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

export const login = createAsyncThunk(
  'user/login',
  async (
    userData: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const loginURL = `${baseURL}/login`;

    try {
      const response = await fetch(loginURL, {
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
  reducers: {
    addUser: (
      state,
      {
        payload,
      }: {
        payload: {
          user: {
            name: string;
            email: string;
            user_id: string;
          };
          token: string;
        };
      }
    ) => {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: state => {
      // delete user data from local storage
      state.user = null;
      state.token = null;
      useLocalStorage('remove', state.keyStorage);
    },
  },
  extraReducers: builder => {
    // login
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
                user_id: string;
              };
              token: string;
            };
          }
        ) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;

          useLocalStorage('add', state.keyStorage, payload);

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
      })
      // login
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;

        useLocalStorage('add', state.keyStorage, action.payload);

        swal({
          icon: 'success',
          title: 'Login successfully',
          text: 'You will be redirect to home page',
        });
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
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

export const { addUser, logout } = userSlice.actions;
