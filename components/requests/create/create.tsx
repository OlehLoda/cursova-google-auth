import PlusIcon from "../../../public/icons/plus";
import s from "./create.module.css";

interface Props {
  setActive: (value: boolean) => void;
}

export default function Create({ setActive }: Props) {
  return (
    <div className={s.create} onClick={() => setActive(true)}>
      <p>Оформити заявку!</p>
      <PlusIcon />
    </div>
  );
}
