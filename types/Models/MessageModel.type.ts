export type MessageModel = {
  message_id: number;
  sender_id: number;
  reciever_id: number;
  created_date_time: Date;
  last_edited_date_time: Date | null;
  seen: boolean;
  content: string;
  group_chat_id: number | null;
};
