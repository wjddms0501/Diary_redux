// import 먼저 하기 
// redux-toolkit => 전역상태관리(store)를 하기 위함   
// toolkit에 있는 API로 불러옴 
// 1_thunk는 비동기 통신을 위함 (axios)랑 통신하기 위해서 
//   => 리듀서에서는 비동기 통신을 할 수 없음 = 서버와 연동이 안됨 
// 2_creadteSlice는 리듀서의 역할 
//   => 액션value, 액션함수, 리듀서를 합쳐놓았기 때문에 코드가 간략해짐
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios => json-server에 있는 데이터를 가져오기 위함 (백엔드연습)
import axios from "axios";


// 기본데이터 diary안에 관리할 데이터가 들어가고
// isLoading - 서버와의 통신결과
// error - 에러객체 저장
const initialState = {
  diary: [],
  isLoading: false,
  error: null,
};


// --------------------------------------------------Diary 미들웨어
// middleware - thunk , axios 비동기처리 담당
// "getDiary"첫번재 인자 : aciton value
// "( ) => { }"두번째 인자 : 콜백함수 (payload, thunkAPI - thunk기능들)
// 데이터 불러오기 
export const __getDiary = createAsyncThunk(
  "getDiary",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3005/diary");
      // console.log('로딩데이터: ', data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 데이터 추가
// const data = 이후 부분은 axios에서 보내라는 형식으로 구성되는 부분 
// axios.post(url,추가할 객체)
export const __addDiary = createAsyncThunk(
  "addDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.post("http://localhost:3005/diary", payload);
      console.log("추가데이터: ", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 데이터삭제 : 서버에서는 데이터를 삭제했으므로, 
// 아래 리듀서에 삭제할 데이터를 보낼 순 없다. 
// 리듀서에서는 id값을 받아서 filter로 걸러낸 후 store에 있는 데이터를 출력해줘야함
export const __delDiary = createAsyncThunk(
  "delDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.delete(
        `http://localhost:3005/diary/${payload}`, payload );
      console.log("데이터삭제, 리듀서는 id값 주기: ", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editStartDiary = createAsyncThunk(
  "editStartDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.put(`http://localhost:3005/diary/${payload.id}`, payload )
      console.log('수정: ', data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editEndtDiary = createAsyncThunk(
  "editEndDiary",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.put(`http://localhost:3005/diary/${payload.id}`,payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);


// --------------------------------------------------Diary 리듀서
export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: {
    // 리스트 불러오기 ---------------
    [__getDiary.pending]: (state) => {
      state.isLoading = true;
      // 네트워크 요청 시작-> 로딩 true 변경합니다.
    },
    [__getDiary.fulfilled]: (state, action) => {
      // action으로 받아온 객체를 store에 있는 값에 넣어준다
      state.isLoading = false;
      state.diary = action.payload;
    },
    [__getDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },

    // 리스트 추가 ------------------
    [__addDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__addDiary.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.
      console.log("action-서버값", action.payload);
      state.isLoading = false;
      state.diary = [...state.diary, action.payload];
    },
    [__addDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 리스트 삭제 ------------------
    [__delDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__delDiary.fulfilled]: (state, action) => {
      // 미들웨어를 통해 받은 action값이 무엇인지 항상 확인한다
      console.log("action-서버값", action.payload);
      state.isLoading = false;
      const newList = state.diary.filter((t) => t.id !== action.payload);
      state.diary = [...newList];
    },
    [__delDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 수정 버튼 클릭 -----------------
    [__editStartDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__editStartDiary.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const copy = [...state.diary];
      const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
      state.diary[index] = action.payload;
      state.diary = [...state.diary];
    },
    [__editStartDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 수정 완료 버튼 클릭 -----------------
    [__editStartDiary.pending]: (state) => {
      state.isLoading = true;
    },
    [__editStartDiary.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
      state.diary[index] = action.payload;
      state.diary = [...state.diary];
    },
    [__editStartDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default diarySlice.reducer;
