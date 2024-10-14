import {json} from "@remix-run/node";
import {getLastAvailabilityLog} from "~/models/availability-log.server";
import {runAbilityCheck} from "~/lib/availability-check.server";

export const loader = async () => {
    const lastAvailabilityLog = await getLastAvailabilityLog()
    //Check if the last check is more than 8 minutes ago
    const now = new Date()
    const lastCheck = lastAvailabilityLog?.timestamp
    if (!lastCheck || (now.getTime() - lastCheck.getTime()) > 1000 * 60 * 8) {
        await runAbilityCheck()
        return json({
            status: "success",
            code: 200,
            message: "Availability check started"
        })
    }
    return json({
        status: "error",
        code: 400,
        message: "The last check was less than 8 minutes ago"
    }, {status: 400, statusText: "trigger_too_soon"})
}
