// src/redux/config/_configStore.js
// json-server 연결

import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../modules/diarySlice";
import memoReducer from "../modules/memoSlice";

/**
모듈(Slice)이 여러개인 경우
추가할때마다 reducer 안에 각 모듈의 slice.reducer를 추가해야 함.

하나의 프로젝트 안에서 counter / todos 기능이 모두 있고,
각각 모듈로 구현한 다음에 2개의 모듈을 스토어에 연결해준 것.
*/
const store = configureStore({
  reducer: {
    diaryReducer: diaryReducer,
    memoReducer: memoReducer,
  },
});

export default store;
