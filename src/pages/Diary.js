import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { diary } = useSelector((state) => state.diary);
  const [data, setData] = useState({
    id: 1,
    content: "데이터를 불러오지 못했습니다.",
    emotion: 3,
    date: new Date(),
  });

  const currentEmotionData = emotionList.find(
    (e) => e.emotion_id === data.emotion
  );

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 다이어리 - ${id}번 일기`;
  }, [id]);

  useEffect(() => {
    if (diary.length >= 1) {
      const targetDiary = diary.find((e) => parseInt(e.id) === parseInt(id));

      if (targetDiary) {
        //일기가 존재 할때
        setData(targetDiary);
        return;
      }
      alert("일기가 존재하지 않습니다.");
      navigate(-1, { replace: true });
    }
  }, [id, diary, navigate]);

  if (!data) {
    return <div className="Diary">로딩중입니다.</div>;
  }

  return (
    <div className="Diary">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>
        }
        rightChild={
          <MyButton
            text={"수정하기"}
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          ></MyButton>
        }
      ></MyHeader>
      {/* article: div 과 같지만 여기부터가 내용물임을 검색엔진에 알리는 시멘틱 태그 */}
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              "diary_img_wrapper",
              `diary_img_wrapper_emotion${currentEmotionData.emotion_id}`,
            ].join(" ")}
          >
            <img
              src={currentEmotionData.emotion_img}
              alt={currentEmotionData.emotion_img}
            ></img>
            <div className="emotion_descript">
              {currentEmotionData.emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
