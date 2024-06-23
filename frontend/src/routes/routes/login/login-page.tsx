import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { useErrorNotification } from "../../../hooks/use-error-notification";
import { useNotification } from "../../../hooks/use-notification";
import { loginUserRequestSchema, useLoginUser } from "../../../api/use-login";

const loginFormSchema = loginUserRequestSchema;

const useLoginUserForm = () => {
  return useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useLoginUserForm();
  const mutation = useLoginUser();

  useErrorNotification(mutation, { title: "Login failed" });
  useNotification(mutation.isSuccess, () => {
    toast.success("Welcome back", {
      description: "You have successfully logged in.",
    });
    navigate("/dashboard");
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 min-w-2xl"
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
      >
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

        <div>
          <Button isLoading={mutation.isPending} type="submit">
            Log In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[35vw] ">
        <div className="mb-2 space-y-1">
          <h1 className="text-3xl font-semibold text-start">Course Crafters</h1>
          <p className="text-xs text-start text-muted-foreground">
            Welcome back! Log in to your account.
          </p>
        </div>
        <Separator className="mb-4" />
        <LoginForm />
        <p className="my-4 text-sm text-start text-muted-foreground">
          Don't have an account?
          <Link
            to="/register"
            className="text-sm underline hover:text-brand underline-offset-4 hover:text-foreground"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
