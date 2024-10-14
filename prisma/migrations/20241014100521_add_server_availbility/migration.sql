-- CreateTable
CREATE TABLE "ServerAvailability" (
    "id" SERIAL NOT NULL,
    "datacenterId" INTEGER NOT NULL,
    "serverId" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "availabilityLogId" INTEGER NOT NULL,

    CONSTRAINT "ServerAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServerAvailability" ADD CONSTRAINT "ServerAvailability_availabilityLogId_fkey" FOREIGN KEY ("availabilityLogId") REFERENCES "AvailabilityLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
