import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import { useSelector } from "react-redux";

const Edit = () => {
  const { diary } = useSelector((state) => state.diary);
  const { id } = useParams();

  const item = diary.find((e) => parseInt(e.id) === parseInt(id));
  const [originData] = useState(item);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 다이어리 - ${id}번 일기 수정`;
  }, [id]);

  return (
    <div className="Edit">
      {originData && (
        <DiaryEditor
          isEdit={true}
          originData={item}
          headText="일기 수정하기"
        ></DiaryEditor>
      )}
    </div>
  );
};

export default Edit;
