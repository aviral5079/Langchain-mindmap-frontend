import * as types from "../constants/actionTypes";
import { get } from "../services/api";

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

export const setRootNode = (rootId) => ({
  type: types.SET_ROOT_NODE_ID,
  payload: { rootId },
});

export const setSelectedNode = (nodeId) => ({
  type: types.SET_SELECTED_NODE_ID,
  payload: { nodeId },
});

export const getMindmap = (pdf_file_id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchMindmapRequest());

      // API call to get the mindmap
      const mindmapResponse = await get("mindmapGraph", { pdf_file_id });
      dispatch(fetchMindmapSuccess(mindmapResponse));

      const rootId = Object.keys(mindmapResponse.nodes)[0];
      dispatch(setRootNode(rootId));
      dispatch(setSelectedNode(rootId));
    } catch (err) {
      dispatch(fetchMindmapFailure(err));
    }
  };
};
