import s from "./create.module.css";
import PlusIcon from "../../../public/icons/plus";
import { ModalType } from "@/components/context/types";
import { useGlobalContext } from "@/components/context/context";

export default function Create() {
  const { setModal } = useGlobalContext();

  const createRequestForm = () => setModal({ type: ModalType.CREATE_REQUEST_FORM });

  return (
    <div className={s.create} onClick={createRequestForm}>
      <p>Оформити заявку!</p>
      <PlusIcon />
    </div>
  );
}
