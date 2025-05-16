import { useContext } from "react";
import { type Order, type Customer } from "@/lib/types";
import GlobalContext from "@/components/global-context";

const useGlobalContext = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const openUpsertOrderDialog = (order: Order | null) =>
    dispatch({
      type: "OPEN_UPSERT_ORDER_DIALOG",
      payload: { order },
    });
  const closeUpsertOrderDialog = () =>
    dispatch({
      type: "CLOSE_UPSERT_ORDER_DIALOG",
    });
  const openDeleteOrdersDialog = (ids: number[]) =>
    dispatch({
      type: "OPEN_DELETE_ORDERS_DIALOG",
      payload: { ids },
    });
  const closeDeleteOrdersDialog = () =>
    dispatch({
      type: "CLOSE_DELETE_ORDERS_DIALOG",
    });
  const openUpsertCustomerDialog = (customer: Customer | null) =>
    dispatch({
      type: "OPEN_UPSERT_CUSTOMER_DIALOG",
      payload: { customer },
    });
  const closeUpsertCustomerDialog = () =>
    dispatch({
      type: "CLOSE_UPSERT_CUSTOMER_DIALOG",
    });
  const openDeleteCustomersDialog = (ids: number[]) =>
    dispatch({
      type: "OPEN_DELETE_CUSTOMERS_DIALOG",
      payload: { ids },
    });
  const closeDeleteCustomersDialog = () =>
    dispatch({
      type: "CLOSE_DELETE_CUSTOMERS_DIALOG",
    });
  return {
    ...state,
    openUpsertOrderDialog,
    closeUpsertOrderDialog,
    openDeleteOrdersDialog,
    closeDeleteOrdersDialog,
    openUpsertCustomerDialog,
    closeUpsertCustomerDialog,
    openDeleteCustomersDialog,
    closeDeleteCustomersDialog,
  };
};

export default useGlobalContext;
