"use client";
import { FormEvent } from "react";
import s from "./call-back.module.css";
import { useGlobalContext } from "@/components/context/context";
import { ICallback, ModalType } from "@/components/context/types";

export default function CallBack() {
  const {
    state: { modal },
    setModal,
    findUserData,
    changeUserData,
  } = useGlobalContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data = {} as ICallback;

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const callbacks = findUserData("callbacks")
      ? [...findUserData("callbacks"), data]
      : [data];

    changeUserData({ callbacks });

    alert("Ваше звернення збережене");

    return setModal(null);
  };

  const close = () => setModal(null);

  return modal?.type === ModalType.CALL_BACK ? (
    <div className={s.bg + " " + s.weight} onClick={close}>
      <form
        onReset={close}
        className={s.wrap}
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Зворотній зв’язок</h2>
        <input
          required
          placeholder="Ім’я"
          name="name"
          type="text"
          className={s.input}
        />
        <input
          required
          placeholder="Пошта"
          name="email"
          type="email"
          className={s.input}
        />
        <textarea
          rows={3}
          required
          maxLength={240}
          name="description"
          className={s.input}
          placeholder="Опис проблеми"
        />
        <button type="submit" className={s.submit}>
          Надіслати
        </button>
        <button type="reset" className={s.cross} />
      </form>
    </div>
  ) : (
    <></>
  );
}
