"use client";
import { usePathname } from "next/navigation";
import s from "./header.module.css";
import Link from "next/link";
import UserCard from "../user-card/user-card";
import { ReactNode, useRef, MouseEvent, Fragment } from "react";
import ProfileIcon from "@/public/icons/profile";
import CallBackIcon from "@/public/icons/call-back";
import CallBack from "../call-back/call-back";

interface INavTab {
  children: ReactNode;
  href?: string;
}

export default function Header() {
  const pathname = usePathname();
  const is_active = (link: string) => (pathname === link ? s.active : "");

  const userCardRef = useRef<HTMLDivElement>(null);
  const callBackRef = useRef<HTMLDivElement>(null);

  const openUserCard = () => userCardRef.current?.classList.toggle(s.opened);
  const openCallBack = () => callBackRef.current?.classList.toggle(s.opened);

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
          <div onClick={openCallBack}>
            Зворотній зв’язок
            <CallBackIcon />
          </div>
        ),
      },
      {
        children: <>Вхід</>,
        href: "/login",
      },
      {
        children: <ProfileIcon onClick={openUserCard} />,
      },
    ],
  ];

  return (
    <header className={s.header}>
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
      <div className={s.userCardWrap} ref={userCardRef}>
        <UserCard />
      </div>
      <div className={s.callBackWrap} ref={callBackRef}>
        <CallBack />
      </div>
    </header>
  );
}
