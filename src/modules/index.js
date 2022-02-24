import { combineReducers } from "redux";
import diary from "./diary.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const diaryPersistConfig = {
  key: "diary",
  storage: storage,
  whitelist: ["diary"],
};

const rootReducer = combineReducers({
  diary,
});

export default persistReducer(diaryPersistConfig, rootReducer);
