import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import Setting from "./settings";

export async function SettingsProvider() {
  const currentUser = await getCurrentUser();
  const currentDriver = await prisma.driver.findUnique({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div className="mx-auto mt-8 md:mt-14 sm:max-w-[625px] border border-gray-300 px-12 pt-12 pb-12 ">
      <Setting currentUser={currentUser} currentDriver={currentDriver} />
    </div>
  );
}
