import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Loader2 } from "lucide-react";
import { useTodosContext } from "@/context/todo/useTodosContext";

type Props = {
  todo: Todo;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  completed: z.boolean(),
});

export default function TodoEditForm({ todo }: Props) {
  const { editTodo } = useTodosContext();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
      description: todo.description || "",
    },
  });

  const titleInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await editTodo(
        todo.id,
        values.title,
        values.completed,
        values.description
      );
      form.reset(values);
    } catch (error) {
      console.error("Failed to edit todo:", error);
    } finally {
      setLoading(false);
      titleInputRef.current?.focus();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-3 rounded-md w-full">
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
              <FormItem>
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
                      <SelectTrigger className="w-full">
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
            <Button type="submit" className="w-28" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Loading...
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
