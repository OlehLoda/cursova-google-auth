import s from "./form.module.css";
import { FormEvent, useState } from "react";
import { useGlobalContext } from "@/components/context/context";
import { IRequest, ModalType } from "@/components/context/types";

export default function Form() {
  const {
    state: { modal },
    setModal,
    changeUserData,
    findUserData,
  } = useGlobalContext();

  const [priority, setPriority] = useState(0);

  const dots = Array.from({ length: 10 }, (_, index) => index + 1);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const elements = Array.from(e.currentTarget.elements);

    const data: Record<string, string | number> = {};

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const price = Math.max(priority * 50, 50);

    const final_data = {
      ...data,
      priority,
      price,
    } as IRequest;

    const new_requests = findUserData("requests")
      ? [...findUserData("requests"), final_data]
      : [final_data];

    changeUserData({ requests: new_requests });

    return close();
  };

  const close = () => setModal(null);

  return modal?.type === ModalType.CREATE_REQUEST_FORM ? (
    <div className={s.bg} onClick={close}>
      <form
        onReset={close}
        className={s.wrap}
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Заповніть бланк для опрацювання проблеми</h2>
        <input
          required
          placeholder="Ім’я"
          name="name"
          type="text"
          className={s.input}
        />
        <input
          required
          placeholder="Тема"
          name="title"
          type="text"
          className={s.input}
        />
        <textarea
          required
          rows={3}
          maxLength={240}
          name="description"
          className={s.input}
          placeholder="Опис роботи"
        />
        <div>
          <p>Рівень терміновості</p>
          <p>{priority}/10</p>
        </div>
        <div>
          {dots.map((dot, index) => {
            const is_active = dot <= priority ? s.active : "";
            return (
              <span
                className={s.dot + " " + is_active}
                onClick={() => setPriority(dot)}
                key={index}
              />
            );
          })}
        </div>
        <button type="submit" className={s.submit}>
          Оформити заявку
        </button>
        <button type="reset" className={s.cross} />
      </form>
    </div>
  ) : (
    <></>
  );
}
