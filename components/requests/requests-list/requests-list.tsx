import { Dispatch, SetStateAction, useState } from "react";
import s from "./requests-list.module.css";
import { IRequest } from "../requests";
import AvatarIcon from "../../../public/icons/avatar";
import LoadMoreIcon from "../../../public/icons/load-more";

interface Props {
  requests: IRequest[] | null;
  setRequests: Dispatch<SetStateAction<IRequest[] | null>>;
}

export default function RequestsList({ requests, setRequests }: Props) {
  const [quantity, setQuantity] = useState<number>(2);

  const completeRequest = (request: IRequest) =>
    setRequests((prev) => {
      const new_data = prev
        ? [...prev.filter((r) => r !== request)].length !== 0
          ? [...prev.filter((r) => r !== request)]
          : null
        : null;
      localStorage.setItem("requests", JSON.stringify(new_data));

      const old_balance = JSON.parse(localStorage.getItem("balance") || "50");
      localStorage.setItem("balance", JSON.stringify(old_balance + request.price));
      return new_data;
    });

  return (
    <div className={s.requestsList}>
      <h2>Доступні для виконання</h2>
      <div className={s.wrapRequests}>
        {requests ? (
          requests.map((request, index) => {
            const { name, title, description, rating, price } = request;
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
                      <p>{rating}/10</p>
                    </div>
                    <button onClick={() => completeRequest(request)}>Відгукнутися</button>
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
