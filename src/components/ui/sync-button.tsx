"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "./spinner";

export function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncClick = async () => {
    setIsSyncing(true);
    try {
      await fetch("/api/sync-videos", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error syncing videos:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return isSyncing ? <Spinner /> : <Button onClick={syncClick}>Sync</Button>;
}
