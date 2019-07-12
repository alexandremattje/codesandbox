import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Alert } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

const isOdd = (num: number) => num % 2;

interface NameProps {
  name: String;
  idade: Number;
  cidadeNatal?: String;
}

function Name(props: NameProps) {
  const { name, idade, cidadeNatal } = props;

  return (
    <>
      <p />
      {`Olá ${name}`}
      <br />
      {`Sua idade é: ${idade}`}
      <br />
      {cidadeNatal ? (
        <>
          Sua cidade natal:
          {cidadeNatal === "Florianópolis" ? (
            <strong>{cidadeNatal}</strong>
          ) : (
            cidadeNatal
          )}
        </>
      ) : (
        "Você não preencheu sua cidade natal"
      )}
    </>
  );
}

interface MyButtonProps {
  id: number;
  count: number;
  setCount: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MyButton = (props: MyButtonProps) => {
  const { id, count, setCount } = props;

  return (
    <p>
      <button id={id} onClick={setCount} value={count}>
        {count}
      </button>
      <br />
      {isOdd(count) ? "Ímpar" : "Par"}
    </p>
  );
};

const MyButton2 = () => {
  let [count, setCount] = useState(0);

  const handlButtonClick = () => {
    setCount(++count);
  };

  return (
    <>
      <p>
        <button onClick={handlButtonClick} value={count}>
          {count}
        </button>
        <br />
        {isOdd(count) ? "Ímpar" : "Par"}
      </p>
    </>
  );
};

function App() {
  let [counts, setCount] = useState([0, 0, 0]);
  let [total, setTotal] = useState(0);

  const handlButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let d = e.target.id;
    counts[d] = counts[d] + 1;
    setCount([...counts]);
  };

  useEffect(() => {
    setTotal(counts.reduce((t, e) => (t += e)));
  }, [counts]);

  return (
    <div className="App">
      {total > 10 && <Alert> {`Você clicou ${total} vezes`}</Alert>}
      <Name name="teste1" idade={2} cidadeNatal="Florianópolis" />
      <Name name="teste2" idade={32} cidadeNatal="Palhoça" />
      <p />
      <MyButton2 />
      <Name name="teste3" idade={12} />
      <p />
      <MyButton id={0} count={counts[0]} setCount={handlButtonClick} />
      <MyButton id={1} count={counts[1]} setCount={handlButtonClick} />
      <MyButton id={2} count={counts[2]} setCount={handlButtonClick} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
