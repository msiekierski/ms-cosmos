import { ASC, DESC, NONE, SORT_TYPES } from "../constants/sortType";
import { CAPSULES, CREW, ROCKETS, STARLINK } from "../constants/titles";
import {
  BEGIN_FETCH,
  FETCH_ERROR,
  FETCH_SUCCESS,
  HIDE_MODAL,
  SHOW_MODAL,
  SORT_COL1,
  SORT_COL2,
} from "./appActions";

const appReducer = (state, action) => {
  if (action.type === SHOW_MODAL) {
    return { ...state, isModalShown: true, selectedTile: action.payload };
  } else if (action.type === HIDE_MODAL) {
    return {
      ...state,
      isModalShown: false,
      data: [],
      sortCount: { col1Sort: 0, col2Sort: 0 },
    };
  } else if (action.type === BEGIN_FETCH) {
    return { ...state, isLoading: true };
  } else if (action.type === FETCH_SUCCESS) {
    let newData = [];
    if (state.selectedTile === CREW) {
      newData = action.payload.map((elem, index) => {
        return { col1: elem.name, col2: elem.status, index };
      });
    } else if (state.selectedTile === CAPSULES) {
      newData = action.payload.map((elem, index) => {
        return { col1: elem.serial, col2: elem.status, index };
      });
    } else if (state.selectedTile === ROCKETS) {
      newData = action.payload.map((elem, index) => {
        return { col1: elem.name, col2: elem.type, index };
      });
    } else if (state.selectedTile === STARLINK) {
      newData = action.payload.map((elem, index) => {
        return {
          col1: elem.spaceTrack.OBJECT_NAME,
          col2: elem.spaceTrack.OBJECT_TYPE,
          index,
        };
      });
    }
    return { ...state, isLoading: false, isError: false, data: newData };
  } else if (action.type === FETCH_ERROR) {
    return { ...state, isLoading: false, isError: true, data: [] };
  } else if (action.type === SORT_COL1) {
    const nextSort = (state.sortCount.col1Sort + 1) % SORT_TYPES.length;
    if (SORT_TYPES[nextSort] === NONE) {
      return {
        ...state,
        sortCount: { col1Sort: nextSort, col2Sort: nextSort },
        data: state.data.sort(None),
      };
    } else if (SORT_TYPES[nextSort] === ASC) {
      return {
        ...state,
        sortCount: { col1Sort: nextSort, col2Sort: 0 },
        data: state.data.sort(AscByCol1),
      };
    } else if (SORT_TYPES[nextSort] === DESC) {
      return {
        ...state,
        sortCount: { col1Sort: nextSort, col2Sort: 0 },
        data: state.data.sort(DescByCol1),
      };
    }
  } else if (action.type === SORT_COL2) {
    const nextSort = (state.sortCount.col2Sort + 1) % SORT_TYPES.length;
    if (SORT_TYPES[nextSort] === NONE) {
      return {
        ...state,
        sortCount: { col1Sort: nextSort, col2Sort: nextSort },
        data: state.data.sort(None),
      };
    } else if (SORT_TYPES[nextSort] === ASC) {
      return {
        ...state,
        sortCount: { col1Sort: 0, col2Sort: nextSort },
        data: state.data.sort(AscByCol2),
      };
    } else if (SORT_TYPES[nextSort] === DESC) {
      return {
        ...state,
        sortCount: { col1Sort: 0, col2Sort: nextSort },
        data: state.data.sort(DescByCol2),
      };
    }
  }
  throw new Error(`No matching ${action.type} - action type`);
};

const AscByCol1 = (a, b) => {
  return a.col1.localeCompare(b.col1);
};

const DescByCol1 = (a, b) => {
  return b.col1.localeCompare(a.col1);
};

const None = (a, b) => {
  return a.index - b.index;
};

const AscByCol2 = (a, b) => {
  return a.col2.localeCompare(b.col2);
};

const DescByCol2 = (a, b) => {
  return b.col2.localeCompare(a.col2);
};

export default appReducer;
