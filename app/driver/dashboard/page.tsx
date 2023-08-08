import getCurrentUser from "@/app/actions/getCurrentUser";
import Signoutbutton from "./signoutbutton";
export default async function Component() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <h1> Driver Dashboard page</h1>
      {currentUser
        ? `Currently logged in as ${currentUser.name}`
        : "Not logged in"}{" "}
      <br />
      <Signoutbutton currentUser={currentUser} />
    </>
  );
}
