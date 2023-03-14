import {useEffect, useState} from "react";


interface InputInterface {
  name: string;
  type: string;
  value: string | number;
  function: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}
const Input = (props: InputInterface) => {
  return (
    <div>
      {/*<label htmlFor={props.name}>{props.name}:</label>*/}

        <div className={"inputForm"}>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.function}
      />
        </div>
    </div>
  );
}

export default Input