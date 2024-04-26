import * as types from "../constants/actionTypes";
import { get, post } from "../services/api";
import {
  getNodeContent,
  getNodeSummary,
  getWordCloud,
} from "./nodeDetailsActions";
import { getRootIds } from "../selectors/mindmapDataSelector";

const fetchMindmapRequest = () => ({
  type: types.FETCH_MINDMAP_REQUEST,
});

const fetchMindmapSuccess = ({ nodes, edges }) => ({
  type: types.FETCH_MINDMAP_SUCCESS,
  payload: { nodes, edges },
});

const fetchMindmapFailure = (error) => ({
  type: types.FETCH_MINDMAP_FAILURE,
  payload: { error },
});

export const setSelectedNode = (nodeId) => ({
  type: types.SET_SELECTED_NODE_ID,
  payload: { selectedNodeId: nodeId },
});

export const setRootNodeIds = (rootNodeIds) => ({
  type: types.SET_ROOT_NODE_IDS,
  payload: { rootNodeIds },
});

export const setCurrentRootNodeId = (currentRootNodeId) => ({
  type: types.SET_CURRENT_ROOT_NODE_ID,
  payload: { currentRootNodeId },
});

export const setNodeDetails = (nodeId) => {
  return async (dispatch) => {
    dispatch(getNodeContent(nodeId));
    dispatch(getNodeSummary(nodeId));
    dispatch(getWordCloud(nodeId));
  };
};

export const toggleIsMindmapVisible = () => ({
  type: types.TOGGLE_IS_MINDMAP_VISIBLE,
});

export const getMindmap = (pdf_file_id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchMindmapRequest());

      // API call to get the mindmap
      const mindmapResponse = await get("mindmapGraph", { user_id: "Aviral", pdf_file_id});
      dispatch(fetchMindmapSuccess(mindmapResponse));

      const rootNodeIds = getRootIds(
        mindmapResponse.nodes,
        mindmapResponse.edges
      );
      dispatch(setRootNodeIds(rootNodeIds));
      const currentRootNodeId = rootNodeIds[0];
      dispatch(setCurrentRootNodeId(currentRootNodeId));
      dispatch(setSelectedNode(currentRootNodeId));
      dispatch(getNodeContent(currentRootNodeId));
      dispatch(getNodeSummary(currentRootNodeId));
      dispatch(getWordCloud(currentRootNodeId));
    } catch (err) {
      dispatch(fetchMindmapFailure(err));
    }
  };
};

export const manualMindmap = (pdf_file_id, page_numbers) => {
  return async (dispatch) => {
    try {
      const user_id = "Aviral";
      let url = `createManualMindmap`;

      url += `?user_id=${user_id}&pdf_file_id=${pdf_file_id}`;
      page_numbers.forEach((page_number) => {
        url += `&page_numbers=${page_number}`;
      });
      const response = await post(url);
      // console.log(response);
      dispatch(getMindmap(response.pdf_id));
    } catch (err) {
      console.log(err);
    }
  };
};
