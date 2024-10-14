import {prisma} from "~/lib/db.server";

export async function logDataCenterAvailability({
                                                    datacenterId,
                                                    availabilityLogId,
                                                    availableServers,
                                                    supportedServers
                                                }: {
    availabilityLogId: number
    datacenterId: number,
    availableServers: Array<number>,
    supportedServers: Array<number>
}) {
    const servers = supportedServers.map(supportedServer => {
        const isAvailable = availableServers.includes(supportedServer)
        return {
            id: supportedServer,
            isAvailable
        }
    })
    return prisma.serverAvailability.createMany({
        data: servers.map(server => ({
            availabilityLogId,
            datacenterId,
            serverId: server.id,
            available: server.isAvailable
        }))
    })

}
