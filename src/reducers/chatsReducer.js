import * as types from "../constants/actionTypes";

const initialState = {
  chats: [],
  isChatLoading: false,
  chatError: null,
  isChatbarVisible: true,
};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHAT_RESPONSE_REQUEST:
      return {
        ...state,
        isChatLoading: true,
        chatError: null,
      };
    case types.FETCH_CHAT_RESPONSE_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, ...action.payload.chat],
        isChatLoading: false,
        chatError: null,
      };
    case types.FETCH_CHAT_RESPONSE_FAILURE:
      return {
        ...state,
        isChatLoading: false,
        chatError: action.payload.error,
      };
    case types.TOGGLE_IS_CHATBAR_VISIBLE:
      return {
        ...state,
        isChatbarVisible: !state.isChatbarVisible,
      };
    default:
      return state;
  }
};

export default chatsReducer;
