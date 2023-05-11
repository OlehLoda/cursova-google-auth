import Form from "./form/form";
import Create from "./create/create";
import { useEffect, useState } from "react";
import RequestsList from "./requests-list/requests-list";

export interface IRequest {
  name: string;
  title: string;
  description: string;
  rating: number;
  price: number;
}

export default function Requests() {
  const [active, setActive] = useState<boolean>(false);
  const [requests, setRequests] = useState<IRequest[] | null>(null);
  const reqProps = { requests, setRequests };

  useEffect(() => {
    const data = localStorage.getItem("requests")
      ? JSON.parse(localStorage.getItem("requests")!)
      : null;
    setRequests(data);
  }, []);

  return (
    <div>
      <Create setActive={setActive} />
      {active && <Form setActive={setActive} {...reqProps} />}
      <RequestsList {...reqProps} />
    </div>
  );
}
