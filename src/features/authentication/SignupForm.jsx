import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";

export default function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { signUp, isPending } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={formState.errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "Full name field's required." })}
        />
      </FormRow>

      <FormRow label="Email address" error={formState.errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "Email field's required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please, provide a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={formState.errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "Password field's required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={formState.errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "Password confirm field's required",
            validate: function (value) {
              return (
                value === getValues().password || "Passwords need to match."
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={reset}
          disabled={isPending}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button onClick={reset} disabled={isPending}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}
