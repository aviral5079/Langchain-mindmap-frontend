import * as types from "../constants/actionTypes";
import { get } from "../services/api";

const fetchChatResponseRequest = () => ({
  type: types.FETCH_CHAT_RESPONSE_REQUEST,
});

const fetchChatResponseSuccess = (chat) => ({
  type: types.FETCH_CHAT_RESPONSE_SUCCESS,
  payload: { chat },
});

const fetchChatResponseFailure = (error) => ({
  type: types.FETCH_CHAT_RESPONSE_FAILURE,
  payload: { error },
});

export const getMessageResponse = (message) => {
  return async (dispatch) => {
    try {
      dispatch(fetchChatResponseRequest());
      const { query, answer } = await get("queryResponse", {
        user_query: message,
      });

      const userMessage = {
        role: "user",
        message: query,
      };
      const chatbotMessage = {
        role: "chatbot",
        message: answer,
      };
      const chat = [userMessage, chatbotMessage];
      dispatch(fetchChatResponseSuccess(chat));
    } catch (err) {
      console.log(err);
      dispatch(fetchChatResponseFailure(err));
    }
  };
};
