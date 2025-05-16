/**
 * @jest-environment jsdom
 */
import { render, queries, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import * as customQueries from "@/lib/custom-queries";
import Workshop12, {
  TogglableCounterControlled,
} from "@/components/workshops/workshop12";

const allQueries = {
  ...queries,
  ...customQueries,
};

const screen = within(document.body, allQueries);

describe("Workshop12", () => {
  it("renders Workshop12 unchanged", () => {
    const { container } = render(<Workshop12 />);
    expect(container).toMatchSnapshot();
  });
});

describe("TogglableCounterControlled", () => {
  beforeEach(async () => {
    // ARRANGE
    render(<TogglableCounterControlled />);
    // ACT
    await userEvent.click(screen.getByRole("switch"));
    // ASSERT
  });
  it("has an initial value of 0", () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(screen.getByDataSlot("card-title")).toHaveTextContent("0");
  });
  it("decreases the counter when clicking the Decrease button", async () => {
    // ARRANGE
    // ACT
    await userEvent.click(screen.getByText("Decrease"));
    // ASSERT
    expect(screen.getByDataSlot("card-title")).toHaveTextContent("-1");
  });
  it("increases the counter when clicking the Increase button", async () => {
    // ARRANGE
    // ACT
    await userEvent.click(screen.getByText("Increase"));
    // ASSERT
    expect(screen.getByDataSlot("card-title")).toHaveTextContent("1");
  });
});
