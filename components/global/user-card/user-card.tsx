"use client";
import { DefaultSession } from "next-auth";
import s from "./user-card.module.css";
import { useSession } from "next-auth/react";
import AvatarIcon from "@/public/icons/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExclamationIcon from "@/public/icons/exclamation";
import placeholder from "../../../public/photos/man.png";

export default function UserCard() {
  const { data: session } = useSession();
  const { user }: { user?: DefaultSession["user"] } = session || {};
  const { name = "Vladyslav", email = "vladyslav@gmail.com", image } = user || {};

  const [balance, setBalance] = useState<number>((name?.split(" ")[0].length || 2) * 50);

  const withdraw = () => {
    setBalance((prev) => {
      const newBalance = prev - 50;
      localStorage.setItem("balance", JSON.stringify(newBalance));
      return prev !== 0 ? newBalance : prev;
    });
  };

  const deposit = () => {
    setBalance((prev) => {
      const newBalance = prev + 50;
      localStorage.setItem("balance", JSON.stringify(newBalance));
      return newBalance;
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("balance")
      ? JSON.parse(localStorage.getItem("balance")!)
      : null;
    if (data) {
      setBalance(data);
    } else localStorage.setItem("balance", JSON.stringify(balance));
  }, []);

  return (
    <div className={s.userCard}>
      {image ? (
        <Image
          width={74}
          height={74}
          src={image}
          alt="Google avatar"
          className={s.avatar}
          placeholder="blur"
          blurDataURL={placeholder.src}
        />
      ) : (
        <AvatarIcon className={s.avatar} width={74} height={74} />
      )}
      <h3 className={s.name}>{name}</h3>
      <p className={s.email}>{email}</p>
      <div className={s.balance}>
        <p>Баланс</p>
        <p>{balance} UAH</p>
      </div>
      <div className={s.buttons}>
        <button onClick={withdraw}>Вивести</button>
        <button onClick={deposit}>Поповнити</button>
      </div>
      <div className={s.notifications}>
        <p>Немає активних сповіщень</p>
        <ExclamationIcon />
      </div>
    </div>
  );
}
