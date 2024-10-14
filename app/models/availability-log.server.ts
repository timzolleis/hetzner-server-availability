import {prisma} from "~/lib/db.server";

export async function getLastAvailabilityLog() {
    return prisma.availabilityLog.findFirst({
        orderBy: {
            timestamp: 'desc'
        }
    })
}

export async function createAvailabilityLog(errorMessage?: string) {
    return prisma.availabilityLog.create({
        data: {
            success: !errorMessage,
            error: errorMessage,
        }
    })
}