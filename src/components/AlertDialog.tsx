import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Loader2 } from "lucide-react";

type props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ActionDialog({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  loading = false,
}: props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof loading !== "undefined") {
      setIsLoading(loading);
    }
  }, [loading]);

  function handleCancelClick() {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  }

  function handleConfirmClick() {
    if (onConfirm) {
      setIsLoading(true);
      onConfirm();
    }
    if (!isLoading) {
      setOpen(false);
    }
  }

  return (
    <AlertDialog defaultOpen={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClick}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Loading...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
