import produce from "immer";

const initialState = {
  diary: [
    // {
    //   id: 1,
    //   emotion: 5,
    //   content: "오늘의 일기 1번",
    //   date: 1645546766219,
    // },
    // {
    //   id: 2,
    //   emotion: 3,
    //   content: "오늘의 일기 2번",
    //   date: 1645546766220,
    // },
    // {
    //   id: 3,
    //   emotion: 1,
    //   content: "오늘의 일기 3번",
    //   date: 1645546766222,
    // },
    // {
    //   id: 4,
    //   emotion: 2,
    //   content: "오늘의 일기 4번",
    //   date: 1645546766223,
    // },
    // {
    //   id: 5,
    //   emotion: 4,
    //   content: "오늘의 일기 5번",
    //   date: 1645546766224,
    // },
  ],
};

/* 액션 타입 만들기 */
export const INIT = "INIT";
export const DIARY_CREATE_REQUEST = "DIARY_CREATE_REQUEST";
export const DIARY_CREATE_SUCCESS = "DIARY_CREATE_SUCCESS";
export const DIARY_CREATE_FAILURE = "DIARY_CREATE_FAILURE";

export const DIARY_REMOVE_REQUEST = "DIARY_REMOVE_REQUEST";
export const DIARY_REMOVE_SUCCESS = "DIARY_REMOVE_SUCCESS";
export const DIARY_REMOVE_FAILURE = "DIARY_REMOVE_FAILURE";

export const DIARY_UPDATE_REQUEST = "DIARY_UPDATE_REQUEST";
export const DIARY_UPDATE_SUCCESS = "DIARY_UPDATE_SUCCESS";
export const DIARY_UPDATE_FAILURE = "DIARY_UPDATE_FAILURE";

/* 리듀서 선언 */

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        draft.diary = action.data;
        break;
      case DIARY_CREATE_SUCCESS:
        draft.diary.push(action.data);
        break;
      case DIARY_REMOVE_SUCCESS:
        draft.diary = draft.diary.filter((e) => e.id !== action.data);
        break;
      case DIARY_UPDATE_SUCCESS:
        draft.diary = draft.diary.map((e) =>
          e.id === action.data.id ? action.data : e
        );
        break;
      default:
        return state;
    }
  });
};

export default reducer;
