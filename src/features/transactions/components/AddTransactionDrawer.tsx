import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../shared/components/ui/drawer";
import { Input } from "../../../shared/components/ui/input";
import { Label } from "../../../shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select";
import {
  DEFAULT_NEW_TRANSACTION_VALUES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_STATUSES,
  TransactionTypeEnum,
} from "../../../shared/constants/global";
import { toDateInputString } from "../../../shared/utils/formatters";
import { useTransactionStore } from "../store/transactionStore";
import {
  type TransactionCategory,
  type TransactionStatus,
  type TransactionType,
} from "../types";

interface AddTransactionDrawerProps {
  onSuccess?: (description: string) => void;
}

interface FormValues {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}

const AddTransactionDrawer = ({ onSuccess }: AddTransactionDrawerProps) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [isOpen, setIsOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const today = useMemo(() => toDateInputString(new Date()), []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      amount: 0,
      type: DEFAULT_NEW_TRANSACTION_VALUES.type,
      category: DEFAULT_NEW_TRANSACTION_VALUES.category,
      date: today,
      status: DEFAULT_NEW_TRANSACTION_VALUES.status,
    },
  });

  const openDatePicker = () => {
    const input = dateInputRef.current as
      | (HTMLInputElement & { showPicker?: () => void })
      | null;

    input?.showPicker?.();
  };

  const { ref: dateFieldRef, ...dateFieldProps } = register("date", {
    required: "Date is required",
    validate: (value) => value <= today || "Future dates are not allowed",
  });

  const onSubmit = (values: FormValues) => {
    addTransaction({
      description: values.description.trim(),
      amount: values.amount,
      type: values.type,
      category: values.category,
      date: values.date,
      status: values.status,
    });

    onSuccess?.(values.description.trim());
    setIsOpen(false);
    reset({
      description: "",
      amount: 0,
      type: DEFAULT_NEW_TRANSACTION_VALUES.type,
      category: DEFAULT_NEW_TRANSACTION_VALUES.category,
      date: today,
      status: DEFAULT_NEW_TRANSACTION_VALUES.status,
    });
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="sm">Add Transaction</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Transaction</DrawerTitle>
          <DrawerDescription>
            Add a new income or expense entry to your FinFlow dashboard.
          </DrawerDescription>
        </DrawerHeader>

        <form
          className="flex flex-1 flex-col overflow-y-auto px-6 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g., Salary - April"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 3,
                    message: "Description must be at least 3 characters",
                  },
                })}
              />
              {errors.description && (
                <span className="text-xs text-rose-600">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Amount is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Amount must be greater than 0",
                })}
              />
              {errors.amount && (
                <span className="text-xs text-rose-600">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Label>Type</Label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TransactionTypeEnum.Income}>
                          Income
                        </SelectItem>
                        <SelectItem value={TransactionTypeEnum.Expense}>
                          Expense
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <span className="text-xs text-rose-600">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label>Category</Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSACTION_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <span className="text-xs text-rose-600">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                max={today}
                {...dateFieldProps}
                ref={(element) => {
                  dateFieldRef(element);
                  dateInputRef.current = element;
                }}
                onFocus={openDatePicker}
                onClick={openDatePicker}
              />
              {errors.date && (
                <span className="text-xs text-rose-600">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <span className="text-xs text-rose-600">
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>

          <DrawerFooter className="px-0 pb-0 pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>

            <DrawerClose asChild>
              <Button type="button" variant="outline" className="mt-2 w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;
