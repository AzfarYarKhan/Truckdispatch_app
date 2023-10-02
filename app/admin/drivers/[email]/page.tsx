import prisma from "@/app/libs/prismadb";

export default async function driverdetails({
  params,
}: {
  params: { email: string };
}) {
  const req_email = decodeURIComponent(params.email);
  const user = await prisma.user.findUnique({
    where: {
      email: req_email,
    },
    include: {
      driver: {
        select: {
          company: true,
          address: true,
          phone_number: true,
        },
      },
    },
  });
  return (
    <>
      <h1>Driver details page of driver named {user?.name}</h1>
      <h1>Company is {user?.driver?.company} </h1>
    </>
  );
}
