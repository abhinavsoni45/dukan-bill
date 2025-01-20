import List from "@mui/material/List";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetBills } from "../../hooks/useGetBills";
import { Bill } from "../../gql/graphql";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data } = useGetBills();
  console.log(data);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {/* {data?.bills.map((bill: any) => {
            return <ChatListItem bill={bill} />;
          })} */}
          {data?.bills
            .map((bill: Bill) => <ChatListItem bill={bill} />)
            .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
