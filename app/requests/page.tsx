"use client";
import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Requests from "@/components/requests/requests";

export default function RequestsPage() {
  const {
    state: { current_user },
  } = useGlobalContext();
  return current_user ? <Requests /> : <Empty />;
}
