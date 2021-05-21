import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import {
  CAPSULES_URL,
  CREW_URL,
  ROCKETS_URL,
  STARLINK_URL,
} from "../constants/api_links";
import { CAPSULES, CREW, ROCKETS, STARLINK } from "../constants/titles";
import {
  BEGIN_FETCH,
  FETCH_ERROR,
  FETCH_SUCCESS,
  HIDE_MODAL,
  SHOW_MODAL,
  SORT_COL1,
  SORT_COL2,
} from "../reducers/appActions";
import appReducer from "../reducers/appReducer";

const AppContext = React.createContext();

const initState = {
  isModalShown: false,
  selectedTile: "Capsules",
  data: [],
  isLoading: false,
  isError: false,
  col1: "",
  col2: "",
  col1Sort: 0,
  col2Sort: 0,
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  const openModal = (title) => {
    dispatch({ type: SHOW_MODAL, payload: title });
  };

  const closeModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      if (state.selectedTile === CREW) {
        url = CREW_URL;
      } else if (state.selectedTile === CAPSULES) {
        url = CAPSULES_URL;
      } else if (state.selectedTile === ROCKETS) {
        url = ROCKETS_URL;
      } else if (state.selectedTile === STARLINK) {
        url = STARLINK_URL;
      }
      try {
        const { data } = await axios.get(url);
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (e) {
        dispatch({ type: FETCH_ERROR });
      }
    };
    if (state.isModalShown) {
      dispatch({ type: BEGIN_FETCH });
      fetchData();
    }
  }, [state.selectedTile, state.isModalShown]);

  const triggerSortCol1 = () => {
    dispatch({ type: SORT_COL1 });
  };

  const triggerSortCol2 = () => {
    dispatch({ type: SORT_COL2 });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        triggerSortCol1,
        triggerSortCol2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
