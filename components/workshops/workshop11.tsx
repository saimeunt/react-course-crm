"use client";
import { noop } from "lodash";
import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type ActionDispatch,
} from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type State = {
  count: number;
};

const initialState = (): State => ({ count: 0 });

type Action =
  | {
      type: "DECREASE";
    }
  | { type: "INCREASE" };

const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DECREASE": {
      return { ...state, count: state.count - 1 };
    }
    case "INCREASE": {
      return { ...state, count: state.count + 1 };
    }
  }
};

const CounterContext = createContext<{
  state: State;
  dispatch: ActionDispatch<[action: Action]>;
}>({
  state: initialState(),
  dispatch: noop,
});

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState());
  return (
    <CounterContext value={{ state, dispatch }}>{children}</CounterContext>
  );
};

const useCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const decrease = () => dispatch({ type: "DECREASE" });
  const increase = () => dispatch({ type: "INCREASE" });
  return { ...state, decrease, increase };
};

const CounterCardControlled = ({
  count,
  decrease,
  increase,
}: {
  count: number;
  decrease: () => void;
  increase: () => void;
}) => (
  <Card>
    <CardHeader>
      <CardDescription>Counter</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums">
        {count}
      </CardTitle>
    </CardHeader>
    <CardFooter className="flex justify-between gap-4">
      <Button variant="outline" onClick={decrease}>
        Decrease
      </Button>
      <Button variant="outline" onClick={increase}>
        Increase
      </Button>
    </CardFooter>
  </Card>
);

const CounterCard = () => {
  const { count, decrease, increase } = useCounter();
  return (
    <CounterCardControlled
      count={count}
      decrease={decrease}
      increase={increase}
    />
  );
};

const Workshop11 = () => {
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <div className="flex flex-col items-center gap-4">
        <CounterCard />
      </div>
    </div>
  );
};

export default Workshop11;
