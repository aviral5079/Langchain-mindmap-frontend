import * as types from "../constants/actionTypes";

const initialState = {
  nodes: {},
  edges: [],
  rootId: "",
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
    case types.SET_ROOT_NODE_ID:
      return {
        ...state,
        rootId: action.payload.rootId,
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
