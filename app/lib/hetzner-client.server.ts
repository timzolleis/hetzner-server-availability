import {datacenterSchema} from "~/lib/hetzner-schemas";
import {z} from "zod";
import {env} from "~/lib/env.server";

export class HetznerClient {
    private baseUrl = "https://api.hetzner.cloud/v1"
    private authenticationHeader = `Bearer ${env.HETZNER_API_KEY}`

    private async makeRequest({url, method}: { url: string, method: "get" | "post" }) {
        const completeUrl = url.startsWith("/") ? `${this.baseUrl}${url}` : `${this.baseUrl}/${url}`
        const response = await fetch(completeUrl, {
            method,
            headers: {
                "Authorization": this.authenticationHeader
            }
        })
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return await response.json()
    }

    public async getDatacenters() {
        const responseSchema = z.object({
            datacenters: z.array(datacenterSchema)
        })
        const json = await this.makeRequest({
            url: "/datacenters",
            method: "get"
        })
        return responseSchema.parse(json)
    }


}