import { FormEvent } from "react";
import s from "./verification.module.css";
import { useGlobalContext } from "../context/context";
import Image from "next/image";
import document_icon from "../../public/photos/document.png";
import { IVerification } from "../context/types";
import { useRouter } from "next/navigation";

export default function Verification() {
  const { findUserData, changeUserData } = useGlobalContext();

  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data = {} as IVerification;

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const verifications = findUserData("verifications")
      ? [...findUserData("verifications"), data]
      : [data];

    changeUserData({ verifications });

    alert("Ваша заявка збережена");

    return router.push("/");
  };

  return (
    <div className={s.bg}>
      <form className={s.form} onSubmit={onSubmit}>
        <h2>Пройти верифікацію</h2>
        <input
          required
          placeholder="Mail"
          name="email"
          type="email"
          className={s.input}
        />
        <input
          required
          placeholder="Посада/досвід"
          name="description"
          type="text"
          className={s.input}
        />
        <label className={s.upload}>
          <Image
            src={document_icon.src}
            alt="certificate"
            width={50}
            height={50}
          />
          Завантажити сертифікат
          <input type="file" name="certificate" />
        </label>
        <button type="submit" className={s.submit}>
          Оформити заявку
        </button>
        <a href="https://www.google.com/search?q=%D0%B2+%D0%BC%D0%B5%D0%BD%D0%B5+%D0%B2%D0%B8%D0%BD%D0%B8%D0%BA%D0%BB%D0%B8+%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B8%2C+%D1%89%D0%BE+%D1%80%D0%BE%D0%B1%D0%B8%D1%82%D0%B8%3F&oq=%D0%B2+%D0%BC%D0%B5%D0%BD%D0%B5+%D0%B2%D0%B8%D0%BD%D0%B8%D0%BA%D0%BB%D0%B8+%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B8%2C+%D1%89%D0%BE+%D1%80%D0%BE%D0%B1%D0%B8%D1%82%D0%B8%3F&aqs=chrome..69i57.12599j0j7&sourceid=chrome&ie=UTF-8">
          Виникли проблеми?
        </a>
      </form>
    </div>
  );
}
