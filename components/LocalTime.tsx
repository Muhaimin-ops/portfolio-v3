"use client";
import { useEffect, useState } from "react";

export default function LocalTime({ timeZone = "Asia/Dhaka" }: { timeZone?: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date()));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, [timeZone]);
  return <span suppressHydrationWarning>{t ? `${t} local time` : " "}</span>;
}
