import LoginForm from "../features/authentication/LoginForm";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className="grid h-screen grid-cols-[48rem] content-center justify-center gap-[3.2rem] bg-gray-50">
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
