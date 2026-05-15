import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import Searching from "../../ui/Searching";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("ranek58206@acanok.com"),
    [password, setPassword] = useState("101gad101gad"),
    { isPending, login } = useLogin();

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: function () {
          setEmail("");
          setPassword("");
        },
      },
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      {isPending ? (
        <Searching />
      ) : (
        <>
          <FormRowVertical label="Email address">
            <Input
              type="email"
              id="email"
              // This makes this form better for password managers
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormRowVertical>
          <FormRowVertical label="Password">
            <Input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormRowVertical>
          <FormRowVertical></FormRowVertical>
        </>
      )}
      <Button disabled={isPending} size="large">
        {isPending ? <SpinnerMini /> : "Login"}
      </Button>
    </Form>
  );
}

export default LoginForm;
