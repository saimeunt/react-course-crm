"use client";
import { useState } from "react";
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

export const TogglableCounterControlled = () => {
  const [checked, setChecked] = useState(false);
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
      {checked && (
        <CounterCardControlled
          count={count}
          decrease={() => setCount(count - 1)}
          increase={() => setCount(count + 1)}
        />
      )}
    </div>
  );
};

const Workshop12 = () => {
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <div className="flex flex-col items-center gap-4">
        <TogglableCounterControlled />
      </div>
    </div>
  );
};

export default Workshop12;
