import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";

interface EventFormProps {
  data: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
}

const formSchema = z.object({
    eventName: z.string(),
    role: z.string(),
    category: z.string(),
    date: z.date(),
});

export type EventFormValues = z.infer<typeof formSchema>;

export const EventForm = ({ data, onSubmit }: EventFormProps) => {
    const roleTypes = ["Participant", "Committee"];
    const categoryTypes = ["Workshop", "Talk", "Competition", "Sports", "Others"];

    const form = useForm<EventFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: data.eventName,
            role: data.role,
            category: data.category,
            date: new Date(data.date),
        },
    });

    const handleSubmit = (values: EventFormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 flex flex-col"
      >
        <FormField
            name="eventName"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Edit event name" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
            <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
                <Datepicker
                selectedDate={field.value}
                onChange={field.onChange}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
            )}
            />
            <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Category Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {categoryTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Role Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {roleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />

            <Button type="submit" variant="outline" className="mt-8 mx-auto">
                Save Changes
            </Button>
      </form>
    </Form>
 );
}

