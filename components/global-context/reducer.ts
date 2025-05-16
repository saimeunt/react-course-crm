import { type Order, type Customer } from "@/lib/types";

export type State = {
  upsertOrderDialogOpen: boolean;
  upsertOrderDialogOrder: Order | null;
  deleteOrdersDialogOpen: boolean;
  deleteOrdersDialogIds: number[];
  upsertCustomerDialogOpen: boolean;
  upsertCustomerDialogCustomer: Customer | null;
  deleteCustomersDialogOpen: boolean;
  deleteCustomersDialogIds: number[];
};

export const initialState = (): State => ({
  upsertOrderDialogOpen: false,
  upsertOrderDialogOrder: null,
  deleteOrdersDialogOpen: false,
  deleteOrdersDialogIds: [],
  upsertCustomerDialogOpen: false,
  upsertCustomerDialogCustomer: null,
  deleteCustomersDialogOpen: false,
  deleteCustomersDialogIds: [],
});

export type Action =
  | {
      type: "OPEN_UPSERT_ORDER_DIALOG";
      payload: { order: Order | null };
    }
  | {
      type: "CLOSE_UPSERT_ORDER_DIALOG";
    }
  | {
      type: "OPEN_DELETE_ORDERS_DIALOG";
      payload: { ids: number[] };
    }
  | {
      type: "CLOSE_DELETE_ORDERS_DIALOG";
    }
  | {
      type: "OPEN_UPSERT_CUSTOMER_DIALOG";
      payload: { customer: Customer | null };
    }
  | {
      type: "CLOSE_UPSERT_CUSTOMER_DIALOG";
    }
  | {
      type: "OPEN_DELETE_CUSTOMERS_DIALOG";
      payload: { ids: number[] };
    }
  | {
      type: "CLOSE_DELETE_CUSTOMERS_DIALOG";
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_UPSERT_ORDER_DIALOG": {
      return {
        ...state,
        upsertOrderDialogOpen: true,
        upsertOrderDialogOrder: action.payload.order,
      };
    }
    case "CLOSE_UPSERT_ORDER_DIALOG": {
      return {
        ...state,
        upsertOrderDialogOpen: false,
      };
    }
    case "OPEN_DELETE_ORDERS_DIALOG": {
      return {
        ...state,
        deleteOrdersDialogOpen: true,
        deleteOrdersDialogIds: action.payload.ids,
      };
    }
    case "CLOSE_DELETE_ORDERS_DIALOG": {
      return {
        ...state,
        deleteOrdersDialogOpen: false,
      };
    }
    case "OPEN_UPSERT_CUSTOMER_DIALOG": {
      return {
        ...state,
        upsertCustomerDialogOpen: true,
        upsertCustomerDialogCustomer: action.payload.customer,
      };
    }
    case "CLOSE_UPSERT_CUSTOMER_DIALOG": {
      return {
        ...state,
        upsertCustomerDialogOpen: false,
      };
    }
    case "OPEN_DELETE_CUSTOMERS_DIALOG": {
      return {
        ...state,
        deleteCustomersDialogOpen: true,
        deleteCustomersDialogIds: action.payload.ids,
      };
    }
    case "CLOSE_DELETE_CUSTOMERS_DIALOG": {
      return {
        ...state,
        deleteCustomersDialogOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
