import {json} from "@remix-run/react";
import {getLastAvailabilityLog} from "~/models/availability-log.server";
import {runAbilityCheck} from "~/lib/availability-check.server";
import {env} from "~/lib/env.server";

export const loader = async () => {
    const lastAvailabilityLog = await getLastAvailabilityLog()
    const now = new Date()
    const lastCheck = lastAvailabilityLog?.timestamp
    if (!lastCheck || (now.getTime() - lastCheck.getTime()) > 1000 * 60 * env.CHECK_INTERVAL) {
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
        message: "Please wait a bit longer before triggering another availability check"
    }, {status: 400, statusText: "trigger_too_soon"})
}
