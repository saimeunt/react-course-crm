import { toast } from "sonner";
import { type Table } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useGlobalContext from "@/components/global-context/hook";
import { deleteOrders, undoDeleteOrders } from "@/components/orders/actions";

const DeleteOrdersAlertDialog = <TData,>({
  table,
}: {
  table: Table<TData>;
}) => {
  const {
    deleteOrdersDialogOpen,
    deleteOrdersDialogIds,
    closeDeleteOrdersDialog,
  } = useGlobalContext();
  return (
    <AlertDialog open={deleteOrdersDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the order
            {deleteOrdersDialogIds.length === 1 ? "" : "s"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDeleteOrdersDialog}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const { message, description } = await deleteOrders(
                deleteOrdersDialogIds,
              );
              toast(message, {
                description,
                action: {
                  label: "Undo",
                  onClick: () => undoDeleteOrders(deleteOrdersDialogIds),
                },
              });
              closeDeleteOrdersDialog();
              table.resetRowSelection();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrdersAlertDialog;
