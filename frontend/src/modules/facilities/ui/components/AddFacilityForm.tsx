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

interface AddFacilityFormProps {
  onSubmit: (values: AddFacilityFormValues) => void;
}

const formSchema = z.object({
  location: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
  type: z.string(),
  name: z.string(),
});

export type AddFacilityFormValues = z.infer<typeof formSchema>;

export const AddFacilityForm = ({ onSubmit }: AddFacilityFormProps) => {
  const facilityTypes = ["Water Dispenser", "Rubbish Bin", "Others"];

  const form = useForm<AddFacilityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: {
        lat: 0,
        lng: 0,
      },
      type: "",
      name: "",
    },
  });

  const handleSubmit = (values: AddFacilityFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 flex flex-col"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facility Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter facility name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            name="location.lat"
            control={form.control}
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    {...rest}
                    placeholder="Edit latitude"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="location.lng"
            control={form.control}
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    {...rest}
                    placeholder="Edit longitude"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facility Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select facility type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {facilityTypes.map((type) => (
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
};
