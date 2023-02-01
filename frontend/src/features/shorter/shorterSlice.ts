import { RootState } from '@/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import useCopyTextToClipboard from '@/hooks/useCopyTextToClipboard';

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

export const getShortenLinks = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('shorter/getShortenLinks', async (_, { getState }) => {
  const baseAPI = 'https://api.shrtco.de/v2';
  const shorterState = getState().shorter;
  const url = `${baseAPI}/shorten?url=${shorterState.inputLink}`;

  try {
    const fetchData = await fetch(url);

    // give an error while user provide a wrong input
    if (fetchData?.ok === false) {
      swal({
        title: `${fetchData?.status} Bad Request`,
        text: 'Maybe you provide a wrong input?',
        icon: 'warning',
      });

      return undefined;
    }

    const data = await fetchData.json();
    return data;
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

        if (payload === undefined) {
          return;
        }

        if (payload?.ok === 'false') {
          swal({
            icon: 'error',
            title: "Something's wrong",
            text: payload?.error,
          });
        }

        if (payload?.ok) {
          const result = payload?.result;

          state.result.unshift({
            code: result?.code,
            shortLink: result?.short_link,
            fullShortLink: result?.full_short_link,
            originalLink: result?.original_link,
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
