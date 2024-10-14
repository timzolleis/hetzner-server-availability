import {HetznerClient} from "~/lib/hetzner-client.server"
import {createAvailabilityLog} from "~/models/availability-log.server";
import {logDataCenterAvailability} from "~/models/server-availability.server";

async function getDataCenters() {
    try {
        const hetznerClient = new HetznerClient()
        const {datacenters} = await hetznerClient.getDatacenters()
        return {success: true, datacenters} as const
    } catch (e) {
        return {success: false, error: e} as const
    }
}


export async function runAbilityCheck() {
    const datacenterResult = await getDataCenters()
    if (!datacenterResult.success) {
        return createAvailabilityLog(`Failed to load datacenters: ${datacenterResult.error}`)
    }
    const availabilityLog = await createAvailabilityLog()
    const dataCenters = datacenterResult.datacenters
    return Promise.all(dataCenters.map(dataCenter => logDataCenterAvailability({
        availabilityLogId: availabilityLog.id,
        datacenterId: dataCenter.id,
        supportedServers: dataCenter.server_types.supported,
        availableServers: dataCenter.server_types.available
    })))
}