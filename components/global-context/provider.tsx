"use client";
import { type ReactNode, useReducer } from "react";

import GlobalContext from "@/components/global-context";
import { initialState, reducer } from "@/components/global-context/reducer";

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  return <GlobalContext value={{ state, dispatch }}>{children}</GlobalContext>;
};

export default GlobalContextProvider;
