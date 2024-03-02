import * as types from "../constants/actionTypes";

const initialState = {
  content: [],
  isContentLoading: false,
  contentError: null,
  summary: "",
  isSummaryLoading: false,
  summaryError: null,
  questions: [],
  areQuestionsLoading: false,
  questionsError: null,
  wordCloud: [],
  isWordCloudLoading: false,
  wordCloudError: null,
  isNodeDetailsVisible: true,
};

const nodeDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NODE_CONTENT_REQUEST:
      return {
        ...state,
        isContentLoading: true,
        contentError: null,
      };
    case types.FETCH_NODE_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        isContentLoading: false,
        contentError: null,
      };
    case types.FETCH_NODE_CONTENT_FAILURE:
      return {
        ...state,
        isContentLoading: false,
        content: [],
        contentError: action.payload.error,
      };
    case types.FETCH_NODE_SUMMARY_REQUEST:
      return {
        ...state,
        isSummaryLoading: true,
        summaryError: null,
      };
    case types.FETCH_NODE_SUMMARY_SUCCESS:
      return {
        ...state,
        isSummaryLoading: false,
        summary: action.payload.summary,
        summaryError: null,
      };
    case types.FETCH_NODE_SUMMARY_FAILURE:
      return {
        ...state,
        isSummaryLoading: false,
        summary: "",
        summaryError: action.payload.error,
      };
    case types.FETCH_NODE_QUESTIONS_REQUEST:
      return {
        ...state,
        areQuestionsLoading: true,
        questionsError: null,
      };
    case types.FETCH_NODE_QUESTIONS_SUCCESS:
      return {
        ...state,
        areQuestionsLoading: false,
        questions: action.payload.questions,
        questionsError: null,
      };
    case types.FETCH_NODE_QUESTIONS_FAILURE:
      return {
        ...state,
        areQuestionsLoading: false,
        questions: [],
        questionsError: action.payload.error,
      };
    case types.RESET_NODE_QUESTIONS:
      return {
        ...state,
        questions: [],
      };
    case types.FETCH_WORD_CLOUD_REQUEST:
      return {
        ...state,
        isWordCloudLoading: true,
        wordCloudError: null,
      };
    case types.FETCH_WORD_CLOUD_SUCCESS:
      return {
        ...state,
        isWordCloudLoading: false,
        wordCloud: action.payload.wordCloud,
        wordCloudError: null,
      };
    case types.FETCH_WORD_CLOUD_FAILURE:
      return {
        ...state,
        isWordCloudLoading: false,
        wordCloud: [],
        wordCloudError: action.payload.error,
      };
    case types.TOGGLE_IS_NODE_DETAILS_VISIBLE:
      return {
        ...state,
        isNodeDetailsVisible: !state.isNodeDetailsVisible,
      };
    default:
      return state;
  }
};

export default nodeDetailsReducer;
