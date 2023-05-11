import { signIn } from "next-auth/react";
import GoogleIcon from "../../public/icons/google";
import s from "./login.module.css";

export default function LogIn() {
  return (
    <button type="button" className={s.btn} onClick={() => signIn("google")}>
      <GoogleIcon />
    </button>
  );
}
