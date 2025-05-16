import { queryHelpers, buildQueries } from "@testing-library/react";

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataSlot = (container: HTMLElement, slot: string) =>
  queryHelpers.queryAllByAttribute("data-slot", container, slot);

const getMultipleError = (container: Element | null, dataSlotValue: string) =>
  `Found multiple elements with the data-cy attribute of: ${dataSlotValue}`;
const getMissingError = (container: Element | null, dataSlotValue: string) =>
  `Unable to find an element with the data-cy attribute of: ${dataSlotValue}`;

const [
  queryByDataSlot,
  getAllByDataSlot,
  getByDataSlot,
  findAllByDataSlot,
  findByDataSlot,
] = buildQueries(queryAllByDataSlot, getMultipleError, getMissingError);

export {
  queryByDataSlot,
  getAllByDataSlot,
  getByDataSlot,
  findAllByDataSlot,
  findByDataSlot,
};
