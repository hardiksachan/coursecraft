import { Link } from "react-router-dom";
import { z } from "zod";
import { Separator } from "../../../components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerUserRequestSchema,
  useRegisterUser,
} from "../../../api/user-register";
import { toast } from "sonner";
import { useErrorNotification } from "../../../hooks/use-error-notification";
import { useNotification } from "../../../hooks/use-notification";

const registerFormSchema = registerUserRequestSchema.extend({
  confirmPassword: z.string(),
});

const useRegisterUserForm = () => {
  return useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};

const RegistrationForm = () => {
  const form = useRegisterUserForm();

  const mutation = useRegisterUser();

  useErrorNotification(mutation, { title: "Registration failed" });
  useNotification(mutation.isSuccess, () => {
    toast.success("Registration successful", {
      description: "You can now login to your account.",
    });
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 min-w-2xl"
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormMessage>
                <FormDescription>
                  Password must contain at least one uppercase letter, one
                  lowercase letter, and one number. And be at least 8 characters
                  long.
                </FormDescription>
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormMessage>
                <FormDescription>Enter the password again.</FormDescription>
              </FormMessage>
            </FormItem>
          )}
        />

        <div>
          <Button isLoading={mutation.isPending} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[35vw] ">
        <div className="mb-2 space-y-1">
          <h1 className="text-3xl font-semibold text-start">Course Crafters</h1>
          <p className="text-xs text-start text-muted-foreground">
            Create an account to start learning.
          </p>
        </div>
        <Separator className="mb-4" />
        <RegistrationForm />
        <p className="my-4 text-sm text-start text-muted-foreground">
          Already have an account?
          <Link
            to="/login"
            className="text-sm underline hover:text-brand underline-offset-4 hover:text-foreground"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
