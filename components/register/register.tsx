import s from "./register.module.css";
import { FormEvent } from "react";
import { useGlobalContext } from "../context/context";
import { IUser } from "../context/types";
import { useRouter } from "next/navigation";

export default function Register() {
  const {
    state: { registered_users },
    registerUser,
  } = useGlobalContext();

  const { push } = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data = {} as IUser;

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    registerUser(data);

    return push("/login");
  };

  return (
    <div className={s.bg}>
      <form className={s.form} onSubmit={onSubmit}>
        <h2>Реєстрація</h2>
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
            id="phone"
            required
            placeholder="Телефон"
            name="phone"
            type="text"
            className={s.input}
            onChange={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/gi, ""))}
          />
        </div>
        <div>
          <input
            required
            placeholder="Пароль"
            name="password"
            type="password"
            className={s.input}
          />
          <input
            required
            placeholder="Повторіть пароль"
            name="password_repeat"
            type="password"
            className={s.input}
          />
        </div>
        <button type="submit" className={s.submit}>
          Далі
        </button>
      </form>
    </div>
  );
}
