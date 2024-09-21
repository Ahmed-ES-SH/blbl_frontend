import { instance } from "./axios";

// get all Conversations about one user

// create Conversations

export const createConversation = (userOneId: number, userTwoId: number) =>
  instance.post(`/conversations`, {
    user_one_id: userOneId,
    user_two_id: userTwoId,
  });

// get all messages about one conversation
export const getMessages = (conversationId: number) =>
  instance.get(`/conversations/${conversationId}/messages`);

// post message
export const sendMessage = (conversationId: number, message: string) =>
  instance.post(`/messages`, { conversation_id: conversationId, message });
