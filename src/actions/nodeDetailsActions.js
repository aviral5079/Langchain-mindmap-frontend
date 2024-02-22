import * as types from "../constants/actionTypes";
import { get } from "../services/api";
import { getContent } from "../selectors/mindmapDataSelector";

const fetchNodeContentRequest = () => ({
  type: types.FETCH_NODE_CONTENT_REQUEST,
});

const fetchNodeContentSuccess = (content) => ({
  type: types.FETCH_NODE_CONTENT_SUCCESS,
  payload: { content },
});

const fetchNodeContentFailure = (error) => ({
  type: types.FETCH_NODE_CONTENT_FAILURE,
  payload: { error },
});

const fetchNodeSummaryRequest = () => ({
  type: types.FETCH_NODE_SUMMARY_REQUEST,
});

const fetchNodeSummarySuccess = (summary) => {
  return {
    type: types.FETCH_NODE_SUMMARY_SUCCESS,
    payload: { summary },
  };
};

const fetchNodeSummaryFailure = (error) => ({
  type: types.FETCH_NODE_SUMMARY_FAILURE,
  payload: { error },
});

const fetchNodeQuestionsRequest = () => ({
  type: types.FETCH_NODE_QUESTIONS_REQUEST,
});

const fetchNodeQuestionsSuccess = (questions) => ({
  type: types.FETCH_NODE_QUESTIONS_SUCCESS,
  payload: { questions },
});

const fetchNodeQuestionsFailure = (error) => ({
  type: types.FETCH_NODE_QUESTIONS_FAILURE,
  payload: { error },
});

export const getNodeContent = (nodeId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchNodeContentRequest());
      const { nodes } = getState().mindmap;
      const content = getContent(nodes, nodeId);
      dispatch(fetchNodeContentSuccess(content));
    } catch (err) {
      console.log(err);
      dispatch(fetchNodeContentFailure(err));
    }
  };
};

export const getNodeSummary = (node_id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchNodeSummaryRequest());
      const { fileName } = getState().currentDocument;
      const { summary } = await get("get_node_summary", {
        pdf_file_id: fileName,
        node_id,
      });
      dispatch(fetchNodeSummarySuccess(summary));
    } catch (err) {
      console.log(err);
      dispatch(fetchNodeSummaryFailure(err));
    }
  };
};

export const getNodeQuestions = (num_questions) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchNodeQuestionsRequest());
      const { fileName } = getState().currentDocument;
      const { selectedNodeId } = getState().mindmap;
      const { quiz } = await get("topQuestions", {
        pdf_file_id: fileName,
        node_id: selectedNodeId,
        num_questions,
      });
      const quizResponse = quiz.replace("### RESPONSE_JSON", "");
      const questionsJSON = JSON.parse(quizResponse);
      // console.log(questionsJSON);
      let questions = [];
      Object.keys(questionsJSON).forEach((key) => {
        questions.push(questionsJSON[key]);
      });
      dispatch(fetchNodeQuestionsSuccess(questions));
    } catch (err) {
      console.log(err);
      dispatch(fetchNodeQuestionsFailure(err));
    }
  };
};
