"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema - same as the create form
const driverFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  licenseNumber: z.string().min(1, "License number is required."),
  licenseType: z.string({
    required_error: "Please select a license type.",
  }),
  licenseExpiry: z.string().min(1, "License expiry date is required."),
  status: z.string({
    required_error: "Please select a status.",
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  currentVehicle: z.string().optional(),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

// Mock data for demonstration - in a real app, this would come from an API
const mockDriverData = {
  "DRV-001": {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    licenseNumber: "DL-123456",
    licenseType: "class_a",
    licenseExpiry: "2025-06-30",
    status: "on_duty",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    notes: "Experienced long-haul driver",
    currentVehicle: "VEH-001",
  },
  "DRV-002": {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    licenseNumber: "DL-789012",
    licenseType: "class_a",
    licenseExpiry: "2024-08-15",
    status: "on_duty",
    address: "456 Oak Ave",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA",
    notes: "Specialized in refrigerated transport",
    currentVehicle: "VEH-005",
  },
  "DRV-003": {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 345-6789",
    licenseNumber: "DL-345678",
    licenseType: "class_a",
    licenseExpiry: "2026-03-22",
    status: "off_duty",
    address: "789 Pine St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
    notes: "Hazardous materials certified",
    currentVehicle: "",
  },
};

export default function EditDriverPage() {
  const router = useRouter();
  const params = useParams();
  const driverId = params.id as string;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Initialize form
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      licenseNumber: "",
      licenseType: "",
      licenseExpiry: "",
      status: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      notes: "",
      currentVehicle: "",
    },
  });

  // Fetch driver data
  useEffect(() => {
    const fetchDriverData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real application, this would be an API call
        // const response = await fetch(`/api/drivers/${driverId}`);
        // if (!response.ok) throw new Error('Failed to fetch driver data');
        // const data = await response.json();

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockDriverData[driverId as keyof typeof mockDriverData];

        if (!data) {
          throw new Error("Driver not found");
        }

        // Set form values
        form.reset(data);

        // Set avatar URL if available
        setAvatarUrl(
          `/placeholder.svg?height=128&width=128&query=${data.firstName}%20${data.lastName}`
        );

        // Set last modified timestamp
        setLastModified(new Date().toISOString());
      } catch (err) {
        console.error("Error fetching driver data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (driverId) {
      fetchDriverData();
    }
  }, [driverId, form]);

  // Form submission handler
  const onSubmit = async (data: DriverFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call
      // const response = await fetch(`/api/drivers/${driverId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'If-Unmodified-Since': lastModified || '' // Optimistic concurrency control
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (response.status === 412) {
      //   // Precondition failed - data was modified by another user
      //   throw new Error('This driver profile has been modified by another user. Please refresh and try again.');
      // }

      // if (!response.ok) throw new Error('Failed to update driver');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updated driver data:", data);

      toast({
        title: "Driver updated",
        description: `${data.firstName} ${data.lastName}'s profile has been updated successfully.`,
      });

      // Navigate back to driver details or list
      router.push("/user/dashboard/fleet");
    } catch (err) {
      console.error("Error updating driver:", err);
      toast({
        title: "Update failed",
        description:
          err instanceof Error
            ? err.message
            : "Failed to update driver profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading driver data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/10 hover:bg-[#1e293b]"
            asChild
          >
            <Link href="/user/dashboard/fleet">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Driver</h1>
        </div>

        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button
          variant="outline"
          className="border-white/10 hover:bg-[#1e293b]"
          asChild
        >
          <Link href="/user/dashboard/fleet">Return to Driver Management</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/10 hover:bg-[#1e293b]"
            asChild
          >
            <Link href={`/user/dashboard/fleet/drivers/${driverId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Driver: {form.getValues("firstName")}{" "}
            {form.getValues("lastName")}
          </h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className=" border-white/10">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="license">
                License & Qualifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="border-white/10">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update the driver's personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col items-center space-y-2 md:w-1/4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage
                          src={avatarUrl || "/placeholder.svg"}
                          alt="Driver avatar"
                        />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-[#1e293b]"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                    <div className="space-y-4 md:w-3/4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John"
                                  className="bg-[#0d1526] border-white/10 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Doe"
                                  className="bg-[#0d1526] border-white/10 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="john.doe@example.com"
                                  className="bg-[#0d1526] border-white/10 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  className="bg-[#0d1526] border-white/10 text-white "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#0d1526] border-white/10 text-white hover:bg-[#1e293b]">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-white/10 bg-[#0d1526]">
                                <SelectItem
                                  value="available"
                                  className="hover:bg-[#1e293b]"
                                >
                                  Available
                                </SelectItem>
                                <SelectItem
                                  value="on_duty"
                                  className="hover:bg-[#1e293b]"
                                >
                                  On Duty
                                </SelectItem>
                                <SelectItem
                                  value="off_duty"
                                  className="hover:bg-[#1e293b]"
                                >
                                  Off Duty
                                </SelectItem>
                                <SelectItem
                                  value="on_leave"
                                  className="hover:bg-[#1e293b]"
                                >
                                  On Leave
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentVehicle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assigned Vehicle</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#0d1526] border-white/10 text-white hover:bg-[#1e293b]">
                                  <SelectValue placeholder="Select vehicle" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-white/10 bg-[#0d1526]">
                                <SelectItem
                                  value="unassigned"
                                  className="hover:bg-[#1e293b]"
                                >
                                  Unassigned
                                </SelectItem>
                                <SelectItem
                                  value="VEH-001"
                                  className="hover:bg-[#1e293b]"
                                >
                                  VEH-001 (Volvo FH16)
                                </SelectItem>
                                <SelectItem
                                  value="VEH-002"
                                  className="hover:bg-[#1e293b]"
                                >
                                  VEH-002 (Mercedes Sprinter)
                                </SelectItem>
                                <SelectItem
                                  value="VEH-003"
                                  className="hover:bg-[#1e293b]"
                                >
                                  VEH-003 (Scania R450)
                                </SelectItem>
                                <SelectItem
                                  value="VEH-004"
                                  className="hover:bg-[#1e293b]"
                                >
                                  VEH-004 (Ford Transit)
                                </SelectItem>
                                <SelectItem
                                  value="VEH-005"
                                  className="hover:bg-[#1e293b]"
                                >
                                  VEH-005 (MAN TGX)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address Information</h3>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Main St"
                              className="bg-[#0d1526] border-white/10 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="New York"
                                className="bg-[#0d1526] border-white/10 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="NY"
                                className="bg-[#0d1526] border-white/10 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10001"
                                className="bg-[#0d1526] border-white/10 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="USA"
                                className="bg-[#0d1526] border-white/10 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="license">
              <Card className="border-white/10 ">
                <CardHeader>
                  <CardTitle>License Information</CardTitle>
                  <CardDescription>
                    Update the driver's license and qualification details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="DL-123456"
                              className="bg-[#0d1526] border-white/10 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licenseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#0d1526] border-white/10 text-white hover:bg-[#1e293b]">
                                <SelectValue placeholder="Select license type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-white/10 bg-[#0d1526]">
                              <SelectItem
                                value="class_a"
                                className="hover:bg-[#1e293b]"
                              >
                                Class A (CDL)
                              </SelectItem>
                              <SelectItem
                                value="class_b"
                                className="hover:bg-[#1e293b]"
                              >
                                Class B (CDL)
                              </SelectItem>
                              <SelectItem
                                value="class_c"
                                className="hover:bg-[#1e293b]"
                              >
                                Class C (CDL)
                              </SelectItem>
                              <SelectItem
                                value="standard"
                                className="hover:bg-[#1e293b]"
                              >
                                Standard
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="hover:bg-[#1e293b]"
                              >
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licenseExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="bg-[#0d1526] border-white/10 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Qualifications & Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any additional qualifications or notes about the driver"
                            className="min-h-[100px] bg-[#0d1526] border-white/10 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-[#1e293b]"
              asChild
            >
              <Link href={`/user/dashboard/fleet/drivers/${driverId}`}>
                Cancel
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 border-white/10"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
