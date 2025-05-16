"use client";
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const CounterCard1 = () => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const defaultCount = localStorage.getItem("count1")
      ? Number(localStorage.getItem("count1"))
      : 0;
    setCount(defaultCount);
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("count1", count.toString());
    }
  }, [mounted, count]);
  return (
    mounted && (
      <CounterCardControlled
        count={count}
        decrease={() => setCount(count - 1)}
        increase={() => setCount(count + 1)}
      />
    )
  );
};

const useLocalStringStorage = (
  key: string,
  defaultValue: string,
): [string | null, Dispatch<SetStateAction<string>>] => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(localStorage.getItem(key) ?? defaultValue);
    setMounted(true);
  }, [key, defaultValue]);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(key, value);
    }
  }, [mounted, key, value]);
  return [mounted ? value : null, setValue];
};

const CounterCard2 = () => {
  const [value, setValue] = useLocalStringStorage("count2", "0");
  return (
    value !== null && (
      <CounterCardControlled
        count={Number(value)}
        decrease={() => setValue((Number(value) - 1).toString())}
        increase={() => setValue((Number(value) + 1).toString())}
      />
    )
  );
};

const useLocalStorage = <T extends { toString: () => string }>(
  key: string,
  defaultValue: T,
): [T | null, Dispatch<SetStateAction<T>>] => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState<T>(defaultValue);
  const valueConstructor = value.constructor;
  useEffect(() => {
    setValue(
      localStorage.getItem(key)
        ? valueConstructor(localStorage.getItem(key))
        : defaultValue,
    );
    setMounted(true);
  }, [key, defaultValue, valueConstructor]);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(key, value.toString());
    }
  }, [mounted, key, value]);
  return [mounted ? value : null, setValue];
};

const CounterCard3 = () => {
  const [count, setCount] = useLocalStorage("count3", 0);
  return (
    count !== null && (
      <CounterCardControlled
        count={count}
        decrease={() => setCount(count - 1)}
        increase={() => setCount(count + 1)}
      />
    )
  );
};

const useCount = (key: string): [number | null, () => void, () => void] => {
  const [count, setCount] = useLocalStorage(key, 0);
  const decrease = () => setCount(count === null ? 0 : count - 1);
  const increase = () => setCount(count === null ? 0 : count + 1);
  return [count, decrease, increase];
};

const CounterCard4 = () => {
  const [count, decrease, increase] = useCount("count4");
  return (
    count !== null && (
      <CounterCardControlled
        count={count}
        decrease={decrease}
        increase={increase}
      />
    )
  );
};

const Workshop6 = () => (
  <div className="flex flex-col px-4 lg:px-6 gap-6">
    <div className="flex flex-col items-center gap-4">
      <CounterCard1 />
      <CounterCard2 />
      <CounterCard3 />
      <CounterCard4 />
    </div>
  </div>
);

export default Workshop6;
