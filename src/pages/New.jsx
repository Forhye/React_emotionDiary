import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const nav = useNavigate();
  //보통 -1을 넣어주면 뒤로 간다

  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.createDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
