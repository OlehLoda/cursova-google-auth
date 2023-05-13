"use client";

import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Verification from "@/components/verification/verification";

export default function VerificationPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();
  return current_user_email ? <Verification /> : <Empty />;
}
