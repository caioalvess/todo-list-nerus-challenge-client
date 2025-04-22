import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { statusOptions } from "@/constants/todo.const";
import { Todo } from "../../types/Todo.type";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

type Props = {
  todo: Todo;
  loading?: boolean;
  onEdit: (
    id: string,
    title: string,
    completed: boolean,
    description?: string
  ) => void;
};

export default function TodoEditForm({ todo, onEdit, loading }: Props) {
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    completed: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
      description: todo.description || "",
    },
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onEdit(todo.id, values.title, values.completed, values.description);
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-3  rounded-md w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Task title"
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      titleInputRef.current = e;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Task description"
                    {...field}
                    className="h-[150px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center gap-4">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex-3">
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center gap-4 justify-end">
            {/* <Button variant="outline" className="cursor-pointer w-28">
              <X className="h-4 w-4" />
              Cancel
            </Button> */}
            <Button type="submit" className="cursor-pointer w-28">
              {loading ? (
                <Button variant="ghost" className="animate-spin">
                  Loading
                </Button>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
