"use client";
import { useState, useEffect } from "react";
import Login from "./login/page";
import Dashboard from "./dashboard/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const userLS = localStorage.getItem("currentUser");
  useEffect(() => {
    if (userLS && userLS != null) {
      setUser(JSON.parse(userLS));
    } else {
      localStorage.setItem("currentUser", null);
    }
  }, [userLS]);

  return <>{user && user?.email ? <Dashboard /> : <Login />}</>;
}
