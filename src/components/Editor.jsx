import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";

import { useState } from "react";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "보통",
  },
  {
    emotionId: 4,
    emotionName: "나쁨",
  },
  {
    emotionId: 5,
    emotionName: "완전 나쁨",
  },
];

const getStringedDate = (targetDate) => {
  // 날짜 -> yyyy-mm-dd
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e) => {
    // console.log(e.target.name); //어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    onSubmit(input);
  };

  // div나 section이나 같다 보기 쉽도록
  return (
    <div className="Editor">
      <section className="date_section">
        <h3>오늘의 날짜</h3>
        <input
          value={getStringedDate(input.createDate)}
          onChange={onChangeInput}
          name="createdDate"
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h3>오늘의 감정</h3>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h3>오늘의 일기</h3>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button text="취소하기" />
        <Button onClick={onClickSubmit} text="작성완료" type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
