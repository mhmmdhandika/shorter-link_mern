import type { RootState } from '@/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import useCopyTextToClipboard from '@/hooks/useCopyTextToClipboard';
import useGetCurrentDate from '@/hooks/useGetCurrentDate';
import useFormatDateToLocale from '@/hooks/useFormatDateToLocale';

type initialStateTypes = {
  inputLink: string;
  formState: boolean;
  copyText: {
    isCopied: boolean;
    text: string;
  };
  result: {
    code: string;
    shortLink: string;
    fullShortLink: string;
    originalLink: string;
    created: string;
    user_id: string;
  }[];
  isLoading: boolean;
};

const initialState: initialStateTypes = {
  inputLink: '',
  formState: false,
  copyText: {
    isCopied: false,
    text: '',
  },
  result: [],
  isLoading: false,
};

const baseAPI = 'http://localhost:5000/api/short-link';

export const getShortenLinks = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('shorter/getShortenLinks', async (_, { getState }) => {
  const shorterState = getState().shorter;
  const userState = getState().user;

  const url = `${baseAPI}/add-new`;

  try {
    const fetchData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userState.token}`,
      },
      body: JSON.stringify({
        url: shorterState.inputLink,
        user_id: userState.user?.user_id,
      }),
    });
    const result = await fetchData.json();

    // give an error while user provide a wrong input or unauthorized
    if (result?.error) {
      swal({
        title: `${fetchData?.status} ${fetchData?.statusText}`,
        text: `${result?.error.name} - ${result?.error.message}`,
        icon: 'error',
      });
      return undefined;
    }

    swal({
      title: result?.message,
      icon: 'success',
      timer: 1000,
    });

    return result?.result;
  } catch (err: any) {
    return swal({
      title: 'Error',
      text: err.message,
      icon: 'error',
    });
  }
});

const shorterSlice = createSlice({
  name: 'shorter',
  initialState,
  reducers: {
    changeFormState: (state, action: PayloadAction<boolean>) => {
      state.formState = action.payload;
    },
    changeInputLink: (state, action: PayloadAction<string>) => {
      state.inputLink = action.payload;
    },
    copyShortLink: (state, action: PayloadAction<string>) => {
      useCopyTextToClipboard(action.payload);
    },
    changeCopyState: (
      state,
      action: PayloadAction<{ isCopied: boolean; text: string }>
    ) => {
      state.copyText = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShortenLinks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getShortenLinks.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload !== undefined) {
          const currentDate = useGetCurrentDate();
          const formatedDateToLocaleEn = useFormatDateToLocale(
            currentDate,
            'en-EN'
          );

          console.log(payload?.user_id);

          state.result.unshift({
            code: payload?.code,
            shortLink: payload?.shortLink,
            fullShortLink: payload?.fullShortLink,
            originalLink: payload?.originalLink,
            created: formatedDateToLocaleEn,
            user_id: payload?.user_id,
          });
        }
      })
      .addCase(getShortenLinks.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default shorterSlice.reducer;

export const {
  changeFormState,
  changeInputLink,
  copyShortLink,
  changeCopyState,
} = shorterSlice.actions;
