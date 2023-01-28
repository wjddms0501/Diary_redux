import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  memo: [],
  isLoading: false,
  error: null,
};

// middleware - thunk , axios 비동기처리 담당
// 첫번재 인자 : aciton value
// 두번째 인자 : 콜백함수 (payload, thunkAPI - thunk기능들)
export const __getMemo = createAsyncThunk(
  "getMemo", async (payload, thunkAPI) => {
    try{
      const data = await axios.get("http://localhost:3005/diary");
      console.log('로딩데이터: ', data)
      return thunkAPI.fulfillWithValue(data);
    }catch(err){
      console.log(err)

      return thunkAPI.rejectWithValue(err);
    }
  }
);


export const __addMemo = createAsyncThunk(
  "addMemo", async (payload, thunkAPI) => {
    console.log(payload)
    // 원래 있던 데이터를 payload로 받은 데이터로 바꿈
    // 앞에서 메모 추가한 데이터가 넘어오기 때문에 
    // 데이터 전체를 바꿔주면 됨 postX, put을 사용함
    try{
      const data = await axios.put(`http://localhost:3005/diary/${payload.id}}`,payload)
      console.log('memo추가-put사용: ', data)
      return thunkAPI.fulfillWithValue(data.data);
    }catch(error){
      if (error.response) {
        // 상세한 에러코드(앞전 코드랑 기능은 같음) 
        // 서버가 상태코드 답함
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청을 했으나 응답이 없음
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 발생한 문제 
        console.log('Error', error.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __delMemo = createAsyncThunk(
  "delMemo", async (payload, thunkAPI) => {
    console.log(payload)
    try{
      const data = await axios.delete(`http://localhost:3005/memo/${payload}`, payload);
      console.log('데이터삭제, 리듀서는 id값 주기: ', payload)
      return payload
      // return thunkAPI.fulfillWithValue(data.data);
    }catch(err){
      console.log(err)
      return thunkAPI.rejectWithValue(err);
    }
  },
);




export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {},
  extraReducers: {
    // memo 리스트 불러오기 ---------------
    [__getMemo.pending]: (state) => {
      state.isLoading = true;
      // 네트워크 요청 시작-> 로딩 true 변경합니다.
    },
    [__getMemo.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.isLoading = false; 
      state.memo = action.payload; 
    },
    [__getMemo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },

    // memo 리스트 추가 ---------------
    [__addMemo.pending]: (state) => {
      state.isLoading = true; 
      // 네트워크 요청 시작-> 로딩 true 변경합니다.
    },
    [__addMemo.fulfilled]: (state, action) => {
      console.log('추가action: ',action.payload)
      state.isLoading = false; 
      const copy = [...state.memo]
      state.memo = [ ...copy, action.payload.data]
    },
    [__addMemo.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },

    // 리스트 삭제 ------------------
    [__delMemo.pending]: (state) => {
      state.isLoading = true; 
    },
    [__delMemo.fulfilled]: (state, action) => {
      console.log('action-서버값',action.payload)
      state.isLoading = false; 
      const copy = [...state.memo]
      const newList = copy.filter((t)=> t.id !== action.payload)
      state.memo = [ ...newList ]
    },
    [__delMemo.rejected]: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
    },
  }

});

export default memoSlice.reducer;
