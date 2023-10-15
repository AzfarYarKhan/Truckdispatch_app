import prisma from "@/app/libs/prismadb";
import Card from "@/components/shared/driver/card";
import ProfileCard from "@/components/shared/driver/profilecard";
import TableDemo from "@/components/shared/driver/testtable";

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
    <div className="flex-col mt-24 lg:pl-12 pl-2 pb-24 mr-2">
      <div className="flex gap-1 md:gap-24 p-1 justify-between xl:justify-start ">
        <Card title="Completed Jobs" value="34" />
        <Card title="Ongoing Jobs" value="1" />
        <Card title="Pending Jobs" value="2" />
      </div>
      <div className="grid sm:max-xl:grid-cols-1 xl:grid-cols-4 gap-4 mt-6 justify-center ">
        <div className="col-span-1 xl:col-span-1 p-2">
          <ProfileCard
            name={user?.name || ""}
            email={user?.email || ""}
            image={user?.image || ""}
            address={user?.driver?.address || ""}
            phone={user?.driver?.phone_number || ""}
            company={user?.driver?.company || ""}
          />
        </div>
        <div className="col-span-1 xl:col-span-3 m-2 md:pl-10">
          <TableDemo />
        </div>
      </div>
    </div>
  );
}
