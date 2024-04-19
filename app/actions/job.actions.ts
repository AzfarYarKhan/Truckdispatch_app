"use server";

import * as z from "zod";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Jobdata } from "@/app/admin/jobs/columns";
import exp from "constants";
const LatitudeLongitude = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const StatusEnum = z.enum(["PENDING", "ACTIVE", "MISSED", "COMPLETED"]);

const formSchema = z.object({
  date: z.date(),
  distance: z.number(),
  job_name: z.string(),
  pickup_loc: LatitudeLongitude,
  dropoff_loc: LatitudeLongitude,
  pickup_name: z.string(),
  dropoff_name: z.string(),
  driverId: z.string(),
  status: StatusEnum,
});

export async function createJob(data) {
  try {
    const existingDriver = await prisma.driver.findUnique({
      where: {
        id: data.driver_id,
      },
    });

    if (!existingDriver) {
      console.error("Driver not found with the provided driver_id.");
      return;
    }
    const newJobData: Prisma.JobUncheckedCreateInput = {
      date: data.date,
      distance: data.distance,
      job_name: data.job_name,
      pickup_loc: data.pickup_location,
      dropoff_loc: data.dropoff_location,
      pickup_name: data.pickup_location_name,
      dropoff_name: data.dropoff_location_name,
      driverId: data.driver_id,
      status: "PENDING",
    };

    const createdJob = await prisma.job.create({
      data: newJobData,
    });

    console.log("Job created successfully:", createdJob);
  } catch (error) {
    console.error("Error creating job:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function cancelJob(name: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        job_name: name,
      },
    });

    if (!job) {
      console.error("Job not found");
      return;
    }

    const updatedJob = await prisma.job.update({
      where: {
        job_name: name,
      },
      data: {
        status: "CANCELLED",
      },
    });

    console.log("Job cancelled successfully:", updatedJob);
  } catch (error) {
    console.error("Error cancelling job:", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function acceptJob(name: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        job_name: name,
      },
    });

    if (!job) {
      console.error("Job not found");
      return;
    }

    const updatedJob = await prisma.job.update({
      where: {
        job_name: name,
      },
      data: {
        status: "ACTIVE",
      },
    });

    console.log("Job accepted successfully:", updatedJob);
  } catch (error) {
    console.error("Error accepting job:", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function finishJob(name: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        job_name: name,
      },
    });

    if (!job) {
      console.error("Job not found");
      return;
    }

    const updatedJob = await prisma.job.update({
      where: {
        job_name: name,
      },
      data: {
        status: "COMPLETED",
      },
    });

    console.log("Job accepted successfully:", updatedJob);
  } catch (error) {
    console.error("Error accepting job:", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function sendSMS(driver_id: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  try {
    const Driver = await prisma.driver.findUnique({
      where: {
        id: driver_id,
      },
    });
    const phone_no = Driver?.phone_number;
    const message = await client.messages.create({
      body: "Hello, Another Job has been assigned to you. Kindly report via APP",
      from: "+13257701591",
      to: phone_no,
    });

    console.log(`SMS sent with SID: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    throw error;
  }
}
export async function sendCancellSMS(name: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  try {
    const job = await prisma.job.findUnique({
      where: {
        job_name: name,
      },
      include: {
        driver: {
          include: {
            user: true,
          },
        },
      },
    });
    const phone_no = job?.driver.phone_number;
    const job_name = job?.job_name;
    const user = job?.driver.user.name;
    const message = await client.messages.create({
      body: `Hello ${user}, It is to notify you that the Job named ${job_name} which was assigned to you has hereby been cancelled.`,
      from: "+13257701591",
      to: phone_no,
    });

    console.log(`SMS sent with SID: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    throw error;
  }
}
export async function getAllJobsData(): Promise<Jobdata[]> {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        driver: {
          include: {
            user: true,
          },
        },
      },
    });

    const jobsdata = jobs?.map((job) => ({
      name: job.job_name,
      date: job.date.toISOString(),
      driver: job.driver.user.name,
      status: job.status,
    }));

    return jobsdata || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
export async function getdriverJobsData(driverId: string): Promise<Jobdata[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        driverId: driverId,
      },
      include: {
        driver: {
          include: {
            user: true,
          },
        },
      },
    });

    const jobsdata = jobs?.map((job) => ({
      name: job.job_name,
      date: job.date.toISOString(),
      driver: job.driver.user.name,
      status: job.status,
    }));

    return jobsdata || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
}

export default async function getalljobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getAllJobsData();
  res.status(200).json(data);
}

export async function share_realtime_loc(
  latitude: number,
  longitude: number,
  jobname: string
) {
  const Pusher = require("pusher");
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true,
  });
  const eventName = `location-update-${jobname}`;
  pusher.trigger("location-channel", eventName, {
    latitude,
    longitude,
  });
}
