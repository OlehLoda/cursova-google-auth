import GoogleIcon from "../../public/icons/google";
import s from "./login.module.css";
import { FormEvent, useState } from "react";
import { useGlobalContext } from "../context/context";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow";

interface IChangePasswordStep {
  step: number;
  email?: string;
}

export default function LogIn() {
  const { findUser, changeUserData, setCurrentUserEmail } = useGlobalContext();

  const [resetPass, setResetPass] = useState<IChangePasswordStep | null>(null);

  const handleResetPass = () => {
    resetPass ? setResetPass(null) : setResetPass({ step: 1 });
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    action: number | null = null,
    email?: string
  ) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data: Record<string, string | number> = {};

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const user_exist = findUser((data["email"] || email) as string);

    const is_password_correct =
      (data["password"] as string) === (data["password_repeat"] as string);

    if (!action && user_exist) {
      const is_password_correct =
        user_exist.password === (data["password"] as string);
      return is_password_correct
        ? setCurrentUserEmail(user_exist.email)
        : alert("Wrong password");
    } else if (action === 1 && user_exist) {
      setResetPass({ step: 2, email: data["email"] as string });
    } else if (action === 2 && user_exist && is_password_correct) {
      changeUserData({
        password: data["password"] as string,
        password_repeat: data["password_repeat"] as string,
      });
      setResetPass(null);
      alert("Пароль змінено");
      return;
    } else if (action === 2 && !is_password_correct) {
      return alert("Паролі відрізняються");
    } else return alert("Користувач не знайдений. Перевірте введені дані");
  };

  const stepBack = () =>
    resetPass?.step && resetPass?.step > 1
      ? setResetPass({ step: resetPass?.step - 1 })
      : setResetPass(null);

  return (
    <div className={s.bg}>
      {!resetPass && (
        <form className={s.form} onSubmit={onSubmit}>
          <h2>Вхід</h2>
          <div>
            <input
              autoFocus
              required
              placeholder="Email"
              name="email"
              type="email"
              className={s.input}
            />
            <input
              required
              placeholder="Пароль"
              name="password"
              type="password"
              minLength={8}
              className={s.input}
            />
          </div>
          <div>
            <button type="submit" className={s.submit}>
              Увійти
            </button>
            <button type="button" onClick={() => signIn()} className={s.google}>
              Sign in with Google <GoogleIcon />
            </button>
          </div>
          <div className={s.links}>
            <Link href={"/register"}>Ще не зареєстровані?</Link>
            <p onClick={handleResetPass}>Забули пароль?</p>
          </div>
        </form>
      )}
      {resetPass?.step === 1 && (
        <form
          className={s.form}
          onSubmit={(e) => onSubmit(e, 1)}
          onReset={stepBack}
        >
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>

          <h2>Відновлення паролю</h2>
          <input
            autoFocus
            required
            placeholder="Email"
            name="email"
            type="email"
            className={s.input}
          />
          <button type="submit" className={s.submit}>
            Продовжити
          </button>
        </form>
      )}
      {resetPass?.step === 2 && (
        <form
          className={s.form}
          onSubmit={(e) => onSubmit(e, 2, resetPass.email)}
          onReset={stepBack}
        >
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>
          <h2>Відновлення паролю</h2>
          <input
            autoFocus
            minLength={8}
            required
            name="password"
            type="text"
            className={s.input}
            placeholder="Введіть новий пароль"
          />
          <input
            minLength={8}
            required
            name="password_repeat"
            type="text"
            className={s.input}
            placeholder="Повторіть пароль"
          />
          <button type="submit" className={s.submit}>
            Змінити пароль
          </button>
        </form>
      )}
    </div>
  );
}
