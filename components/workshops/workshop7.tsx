"use client";
import {
  useRef,
  type MouseEventHandler,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useState,
} from "react";
import { noop } from "lodash";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ClickableCard = ({
  className,
  title,
  description,
  onClick = noop,
  onButtonClick = noop,
  children,
}: {
  className?: string;
  title: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}) => (
  <Card className={className} onClick={onClick}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
    <CardFooter>
      <Button variant="outline" className="w-full" onClick={onButtonClick}>
        Click me!
      </Button>
    </CardFooter>
  </Card>
);

const ButtonCard = () => (
  <ClickableCard
    className="basis-3xs"
    title="Button Card"
    description="Click the button."
    onButtonClick={() => alert("Button clicked!")}
  />
);

const InputCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const onButtonClick =
    (inputValue: string) =>
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) =>
      alert(
        event.shiftKey ? inputValue.toUpperCase() : inputRef.current?.value,
      );
  return (
    <ClickableCard
      className="basis-xs"
      title="Input Card"
      description="Fill the input, then click the button."
      onButtonClick={onButtonClick(value)}
    >
      <Input
        id="input"
        ref={inputRef}
        placeholder="Fill me!"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </ClickableCard>
  );
};

const LinkCard = () => (
  <a href="https://react.dev" className="basis-3xs">
    <ClickableCard
      title="Link Card"
      description="Click the card and the button."
      onClick={() => alert("Card clicked!")}
      onButtonClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        alert("Button clicked!");
      }}
    />
  </a>
);

const Workshop7 = () => (
  <div className="flex flex-col px-4 lg:px-6 gap-6">
    <div className="flex justify-center gap-4">
      <ButtonCard />
    </div>
    <div className="flex justify-center gap-4">
      <InputCard />
    </div>
    <div className="flex justify-center gap-4">
      <LinkCard />
    </div>
  </div>
);

export default Workshop7;
