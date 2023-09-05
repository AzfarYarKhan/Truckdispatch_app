import getCurrentUser from "@/app/actions/getCurrentUser";
export default async function Component() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <h1> Admin Dashboard page</h1>
      {currentUser
        ? `Currently logged in as ${currentUser.name}`
        : "Not logged in"}
    </>
  );
}
