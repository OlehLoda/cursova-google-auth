import { useState } from "react";
import s from "./requests-list.module.css";
import AvatarIcon from "../../../public/icons/avatar";
import { IRequest } from "@/components/context/types";
import LoadMoreIcon from "../../../public/icons/load-more";
import { useGlobalContext } from "@/components/context/context";

export default function RequestsList() {
  const {
    state: { current_user_email },
    findUserData,
    changeUserData,
  } = useGlobalContext();
  if (!current_user_email) return <></>;

  const balance: number = findUserData("balance"),
    requests: IRequest[] = findUserData("requests");

  const [quantity, setQuantity] = useState<number>(2);

  const completeRequest = (request: IRequest) => {
    const new_data = requests
      ? [...requests.filter((r) => r !== request)].length !== 0
        ? [...requests.filter((r) => r !== request)]
        : null
      : null;

    const new_balance = balance + request.price;

    changeUserData({ requests: new_data });
    changeUserData({ balance: new_balance });
  };

  return (
    <div className={s.requestsList}>
      <h2>Доступні для виконання</h2>
      <div className={s.wrapRequests}>
        {requests ? (
          requests.map((request, index) => {
            const { name, title, description, priority, price } = request;
            if (index < quantity)
              return (
                <div key={index} className={s.card}>
                  <div className={s.name}>
                    <AvatarIcon />
                    <p>{name}</p>
                    <p>
                      Тема: <span>{title}</span>
                    </p>
                  </div>
                  <hr className={s.hr} />
                  <div className={s.description}>
                    <p>{description}</p>
                  </div>
                  <hr className={s.vr} />
                  <div className={s.info}>
                    <div>
                      <p>Вартість</p>
                      <p>{price} UAH</p>
                    </div>
                    <div>
                      <p>Терміновість</p>
                      <p>{priority}/10</p>
                    </div>
                    <button onClick={() => completeRequest(request)}>
                      Відгукнутися
                    </button>
                  </div>
                </div>
              );
          })
        ) : (
          <p className={s.empty}>Ви поки не оформили жодної заявки</p>
        )}
      </div>
      {requests && quantity < requests.length && (
        <div className={s.load} onClick={() => setQuantity((prev) => prev + 1)}>
          <LoadMoreIcon />
          <p>ЗАВАНТАЖИТИ ЩЕ</p>
        </div>
      )}
    </div>
  );
}
