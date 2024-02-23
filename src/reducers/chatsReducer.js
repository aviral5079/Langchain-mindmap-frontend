import * as types from "../constants/actionTypes";

const initialState = {
  chats: [],
  isChatLoading: false,
  chatError: null,
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
    default:
      return state;
  }
};

export default chatsReducer;
