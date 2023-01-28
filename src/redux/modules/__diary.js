// 1) Action Value 액션 값 설정
const ADD_DIARY = "ADD_DIARY";

// 2) Action Creator 액션 함수 지정
export const MainDiary = (payload) => {
  // console.log(payload);
  return {
    type: ADD_DIARY,
    payload: payload,
  };
};

// 3) 초기 상태값: 객체형태로 저장한다.
// is_edit있어야해요!!!!! 살려주세요
const initialState = {
  diary: [
    {
      id: 1,
      emotion: "🥰",
      date: "2022-12-25",
      title: "홈파티",
      contents: "찬이 초대하기",
      is_edit: false,
    },
  ],
};

// 4) Reducer 리듀서 작성
const diaryReducer = (state = initialState, action) => {
  // console.log("action", action);
  // console.log("state", state.diary);
  switch (action.type) {
    case ADD_DIARY:
      // console.log([...state.diary, action.payload]);
      return {
        diary: [...state.diary, action.payload],
      };
    // 하나씩 형태를 풀어서 어떻게 넣어야 될지 생각할 것.
    // 원래 리스트와, 새 리스트 형태를 맞춰야 함.

    default:
      return state;
  }
};

// 5) export default reducer 리듀서 내보내기
// export default diaryReducer;
