"use client";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type CSSProperties,
} from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const CounterCard = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [count, setCount] = useState(0);
  return (
    <Card className={className} style={style}>
      <CardHeader>
        <CardDescription>Counter</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {count}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline" onClick={() => setCount(count - 1)}>
          Decrease
        </Button>
        <Button variant="outline" onClick={() => setCount(count + 1)}>
          Increase
        </Button>
      </CardFooter>
    </Card>
  );
};

const TogglableCounter = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="toggle-counter"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="toggle-counter">
          {checked ? "Hide" : "Show"} Counter
        </Label>
      </div>
      {/* <CounterCard className={cn({ "opacity-0": !checked })} /> */}
      <CounterCard style={{ display: checked ? "flex" : "none" }} />
    </div>
  );
};

const CounterCardControlled = ({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) => (
  <Card>
    <CardHeader>
      <CardDescription>Counter</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums">
        {count}
      </CardTitle>
    </CardHeader>
    <CardFooter className="flex justify-between gap-4">
      <Button variant="outline" onClick={() => setCount(count - 1)}>
        Decrease
      </Button>
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </CardFooter>
  </Card>
);

const TogglableCounterControlled = () => {
  const [checked, setChecked] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="toggle-counter-controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="toggle-counter-controlled">
          {checked ? "Hide" : "Show"} Counter
        </Label>
      </div>
      {checked && <CounterCardControlled count={count} setCount={setCount} />}
    </div>
  );
};

const Workshop5 = () => (
  <div className="flex flex-col px-4 lg:px-6 gap-6">
    <TogglableCounter />
    <TogglableCounterControlled />
  </div>
);

export default Workshop5;
