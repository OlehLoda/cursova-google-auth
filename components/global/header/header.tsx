"use client";
import Link from "next/link";
import s from "./header.module.css";
import { signOut } from "next-auth/react";
import { ReactNode, Fragment } from "react";
import { usePathname } from "next/navigation";
import UserCard from "../user-card/user-card";
import CallBack from "../call-back/call-back";
import ProfileIcon from "@/public/icons/profile";
import CallBackIcon from "@/public/icons/call-back";
import { ModalType } from "@/components/context/types";
import { useGlobalContext } from "@/components/context/context";

interface INavTab {
  children: ReactNode;
  href?: string;
}

export default function Header() {
  const pathname = usePathname();
  const is_active = (link: string) => (pathname === link ? s.active : "");

  const {
    state: { modal, current_user },
    setModal,
    setCurrentUser,
  } = useGlobalContext();

  const toggleUserCard = () =>
    modal?.type !== ModalType.USER_CARD ? setModal({ type: ModalType.USER_CARD }) : setModal(null);

  const toggleCallBack = () =>
    modal?.type !== ModalType.CALL_BACK ? setModal({ type: ModalType.CALL_BACK }) : setModal(null);

  const logOut = () => {
    signOut();
    setCurrentUser(null);
  };

  const navMap: INavTab[][] = [
    [
      {
        children: <>BuddyCode</>,
        href: "/",
      },
      {
        children: <>Заявки</>,
        href: "/requests",
      },
      {
        children: <>Отримати верифікацію</>,
        href: "/verification",
      },
    ],
    [
      {
        children: (
          <div onClick={toggleCallBack}>
            Зворотній зв’язок
            <CallBackIcon />
          </div>
        ),
      },
      {
        children: current_user ? (
          <div onClick={logOut}>Вихід</div>
        ) : (
          <>
            Вхід
            <ProfileIcon />
          </>
        ),
        href: current_user ? undefined : "/login",
      },
      {
        children: current_user ? <ProfileIcon onClick={toggleUserCard} /> : <></>,
      },
    ],
  ];

  const logo = navMap[0][0];

  return (
    <header className={s.header}>
      <Link href={logo.href!} className={is_active(logo.href!) + " " + s.mobileLogo}>
        {logo.children}
      </Link>
      <div>
        {navMap.map((nav, index) => (
          <nav key={index}>
            {nav.map(({ children, href }, index) => {
              return href ? (
                <Link href={href} className={is_active(href)} key={index}>
                  {children}
                </Link>
              ) : (
                <Fragment key={index}>{children}</Fragment>
              );
            })}
          </nav>
        ))}
      </div>
      <UserCard />
      <CallBack />

      <label className={s.burger}>
        <input type="checkbox" />
      </label>
    </header>
  );
}
