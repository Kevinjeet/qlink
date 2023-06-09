import { useEffect } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = (props) => {
  useEffect(() => {
    if (props.user.username !== undefined) {
      console.log("username is not undefined");
    }
  }, [props.user.username]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {props.user.username !== undefined ? (
        <PrettyChatWindow
          projectId="d01899ce-a15b-4f67-91a1-246aaf8ba2f0"
          username={props.user.username}
          secret="1234"
          style={{ height: "100%" }}
        />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default ChatsPage;
