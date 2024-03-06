import * as types from "../constants/actionTypes";

const initialState = {
  nodes: {},
  edges: [],
  rootNodeIds: [],
  currentRootNodeId: "",
  selectedNodeId: "",
  loading: false,
  error: null,
  isMindmapVisible: false,
};

const mindmapReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MINDMAP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_MINDMAP_SUCCESS:
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
        loading: false,
        error: null,
      };
    case types.FETCH_MINDMAP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.SET_CURRENT_ROOT_NODE_ID:
      return {
        ...state,
        currentRootNodeId: action.payload.currentRootNodeId,
      };
    case types.SET_ROOT_NODE_IDS:
      return {
        ...state,
        rootNodeIds: action.payload.rootNodeIds,
      };
    case types.SET_SELECTED_NODE_ID:
      return {
        ...state,
        selectedNodeId: action.payload.selectedNodeId,
      };
    case types.TOGGLE_IS_MINDMAP_VISIBLE:
      return {
        ...state,
        isMindmapVisible: !state.isMindmapVisible,
      };
    default:
      return state;
  }
};

export default mindmapReducer;
