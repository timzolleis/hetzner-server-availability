-- CreateIndex
CREATE INDEX "ServerAvailability_serverId_idx" ON "ServerAvailability" USING HASH ("serverId");

-- CreateIndex
CREATE INDEX "ServerAvailability_datacenterId_idx" ON "ServerAvailability" USING HASH ("datacenterId");
