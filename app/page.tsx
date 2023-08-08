import Login from "./auth/login/loginform";
import getCurrentUser from "@/app/actions/getCurrentUser";
export default async function LoginPage() {
  const currentUser = await getCurrentUser();
  return <Login currentUser={currentUser} />;
}
