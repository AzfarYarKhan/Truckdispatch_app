import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

async function UpdateJobs_status(request: NextRequest) {
  try {
    console.log("end point hit");
    const jobs = await prisma.job.findMany();
    for (const job of jobs) {
      if (job.status !== "COMPLETED" && job.status !== "CANCELLED") {
        const today = new Date();
        if (job.date < today) {
          await prisma.job.update({
            where: { id: job.id },
            data: { status: "MISSED" },
          });
        }
      }
    }
    return NextResponse.json({ message: "Jobs statuses Updated Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error Updating Job status" });
  } finally {
    await prisma.$disconnect();
  }
}

export const POST = verifySignatureAppRouter(UpdateJobs_status);
