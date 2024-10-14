-- CreateTable
CREATE TABLE "AvailabilityLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailabilityLog_pkey" PRIMARY KEY ("id")
);
