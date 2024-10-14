-- AlterTable
ALTER TABLE "AvailabilityLog" ADD COLUMN     "error" TEXT,
ADD COLUMN     "success" BOOLEAN NOT NULL DEFAULT true;
