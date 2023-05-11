import List from "./list/list";
import s from "./how-it-works.module.css";

export default function HowItWorks() {
  return (
    <div className={s.wrap}>
      <h2>Як це працює?</h2>
      <List />
    </div>
  );
}
