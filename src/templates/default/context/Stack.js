import * as React from "react";
import { createContext, useContext, useCallback, useReducer } from "react";
import { useTransition, animated } from "react-spring";

export const StackStateContext = createContext({});
StackStateContext.displayName = "StackStateContext";

export const StackDispatcherContext = createContext(null);
StackDispatcherContext.displayName = "StackDispatcherContext";

const ID = "stack";

const reducer = (state, action) => {
  let { stack, type } = state;

  switch (action.type) {
    case "set.stack":
      stack = action.payload.stack;
      type = action.payload.type;
      break;
    case "reset.stack":
      stack = "profile";
      break;
    default:
      return state;
  }

  return {
    ...state,
    stack,
    type,
  };
};

export const StackController = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    stack: "profile",
    type: "",
  });

  const dispatchWrapper = useCallback(
    (action) => {
      dispatch(action);
    },
    [dispatch]
  );

  const stackTransition = useTransition(
    state.stack === "detail" ? [true] : [],
    () => ID,
    {
      reset: false,
      unique: true,
      immediate: false,
      config: {
        mass: 1,
        tension: 190,
        friction: 28,
      },
      from: { transform: "translateX(0%)" },
      enter: { transform: "translateX(-100%)" },
      leave: { transform: "translateX(0%)" },
    }
  )[0];

  return (
    <StackStateContext.Provider value={state}>
      <StackDispatcherContext.Provider value={dispatchWrapper}>
        <animated.div
          className="absolute w-full h-full top-0 left-0 bottom-0"
          style={!!stackTransition ? stackTransition.props : {}}
        >
          {children}
        </animated.div>
      </StackDispatcherContext.Provider>
    </StackStateContext.Provider>
  );
};

export const useStackState = () => {
  return useContext(StackStateContext);
};

export const useStackDispatcher = () => {
  return useContext(StackDispatcherContext);
};
