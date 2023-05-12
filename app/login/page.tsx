"use client";
import { useGlobalContext } from "@/components/context/context";
import LogIn from "@/components/login/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import man from "../../public/photos/man.png";

export default function LoginPage() {
  const {
    state: { current_user },
    findUser,
    registerUser,
    setCurrentUser,
  } = useGlobalContext();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (current_user) {
      return router.push("/");
    } else if (session) {
      const { name, email, image } = session.user || {};

      const user_exist = findUser(email as string);

      if (user_exist) {
        setCurrentUser(user_exist);
        return router.push("/");
      }

      const new_user = {
        email: email || "",
        password: "11111111",
        password_repeat: "11111111",
        name: name || "",
        image: image || man.src,
        requests: null,
        balance: 0,
      };

      registerUser(new_user);
      setCurrentUser(new_user);
      return router.push("/");
    } else return;
  }, [current_user, session]);

  return <LogIn />;
}
