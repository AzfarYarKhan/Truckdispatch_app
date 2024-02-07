"use server";

import * as z from "zod";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

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
