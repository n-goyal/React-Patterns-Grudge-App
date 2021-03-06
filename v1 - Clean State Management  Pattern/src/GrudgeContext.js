import React, { createContext, useReducer, useCallback } from 'react';

import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContext = createContext();

// React.memo(),
// useCallback, gives a new function that we can call rather than the result.
// useMemo, call the function as dependencies haven't changed, it will not call the function again

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  if (action.type === GRUDGE_FORGIVE) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }
};

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  // telling javascript that its the same function,
  // so that react do not trigger rerender for every grudge.
  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id: id
        }
      });
    },
    [dispatch]
  );

  const value = { grudges, addGrudge, toggleForgiveness };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
