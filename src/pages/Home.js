import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryList from "../components/DiaryList";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { DIARY_REMOVE_SUCCESS } from "../modules/diary";
const Home = () => {
  const { diary } = useSelector((state) => state.diary);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    if (diary.length >= 1) {
      //해당 달의 1일
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      // 해당 달의 마지막 일
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(diary.filter((e) => firstDay <= e.date && e.date <= lastDay));
    }
  }, [curDate, diary]);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const onRemoveDiary = () => {
    dispatch({
      type: DIARY_REMOVE_SUCCESS,
      data: {
        // id: targetId,
      },
    });
  };

  const onUpdateDiary = () => {
    dispatch({
      type: DIARY_REMOVE_SUCCESS,
      data: {
        // id: targetId, date, content, emotion
      },
    });
  };

  return (
    <div className="Home">
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
        rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;
