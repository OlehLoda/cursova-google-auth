"use client";
import { FormEvent } from "react";
import s from "./call-back.module.css";

export default function CallBack() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Record<string, string | number> = {};

    const elements = Array.from(e.currentTarget.elements);

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const final_data = {
      ...data,
    };

    return final_data;
  };
  return (
    <form className={s.wrap} onSubmit={onSubmit}>
      <h2>Зворотній зв’язок</h2>
      <input required placeholder="Ім’я" name="name" type="text" className={s.input} />
      <input required placeholder="Пошти" name="title" type="text" className={s.input} />
      <textarea
        required
        rows={3}
        maxLength={240}
        name="description"
        className={s.input}
        placeholder="Проблематика"
      />
      <button type="submit">Надіслати</button>
    </form>
  );
}
