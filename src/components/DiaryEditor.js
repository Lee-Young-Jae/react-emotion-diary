import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  DIARY_CREATE_SUCCESS,
  DIARY_REMOVE_SUCCESS,
  DIARY_UPDATE_SUCCESS,
} from "../modules/diary";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ headText, isEdit, originData }) => {
  const contentRef = useRef();
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const handleClickEmote = (emotionId) => () => {
    setEmotion(emotionId);
  };
  const { diary } = useSelector((state) => state.diary);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    if (content.length < 1) {
      contentRef.current.focus();
      alert("오늘 어떤 일이 있었는지 알려주세요!");
      return;
    }

    if (isEdit) {
      if (window.confirm("일기를 수정하시겠습니까?")) {
        dispatch({
          type: DIARY_UPDATE_SUCCESS,
          data: {
            id: originData.id,
            emotion: emotion,
            content: content,
            date: new Date(date).getTime(),
          },
        });
      } else {
        return;
      }
    } else {
      dispatch({
        type: DIARY_CREATE_SUCCESS,
        data: {
          id: diary.length >= 1 ? diary[diary.length - 1].id + 1 : 1,
          emotion,
          content,
          date: new Date(date).getTime(),
        },
      });
    }

    navigate("/", { replace: true }); //다시 뒤로 못가게 막기
  }, [diary, content, date, emotion, isEdit, originData]);

  const handleRemove = useCallback(() => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch({
        type: DIARY_REMOVE_SUCCESS,
        data: originData.id,
      });
      navigate("/", { replace: true });
    }
  }, [originData]);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEdit">
      <div>
        <MyHeader
          headText={headText}
          leftChild={
            <MyButton
              text={"< 뒤로가기"}
              onClick={() => navigate(-1)}
            ></MyButton>
          }
          rightChild={
            isEdit ? (
              <MyButton
                type={"negative"}
                text={"삭제하기"}
                onClick={handleRemove}
              ></MyButton>
            ) : null
          }
        ></MyHeader>
      </div>
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div className="input_box">
          <input
            className="input_date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
          ></input>
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((e) => (
            <EmotionItem
              key={e.emotion_id}
              data={e}
              emotion={emotion}
              handleClickEmote={handleClickEmote}
              isSelected={e.emotion_id === emotion}
            ></EmotionItem>
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input-box text_wrapper">
          <textarea
            placeholder="오늘은 어떠셨나요?"
            ref={contentRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton
            text="취소하기"
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>

          <MyButton
            text="작성완료"
            type="positive"
            onClick={handleSubmit}
          ></MyButton>
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
