import Form from "./form/form";
import Create from "./create/create";
import RequestsList from "./requests-list/requests-list";

export default function Requests() {
  return (
    <div>
      <Create />
      <Form />
      <RequestsList />
    </div>
  );
}
