import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useReducer,
  useEffect,
} from "react";

import "./Input.css";
import InputReducer from "./InputReducer";

type Props = {
  onInput(id: string | undefined, value: string, isValid: boolean): void;
  errorText: ReactNode;
  type: HTMLInputTypeAttribute | undefined;
  rows?: number;
  placeholder?: string | undefined;
  element: string;
  label: string;
  id?: string | undefined;
  validators: any[];
  initialValue?: any;
  initialIsValid?: boolean;
};

const Input = (props: Props) => {
  const [inputState, dispatch] = useReducer(InputReducer, {
    value: props.initialValue || "",
    isValid: props.initialIsValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}> {props.label} </label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
