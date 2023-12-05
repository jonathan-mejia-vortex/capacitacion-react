import { validate } from "../../util/validators";

type State = {
  value: string | number | readonly string[] | undefined;
  isValid: boolean;
  isTouched: boolean;
};

type Action = {
  val?: any;
  type: any;
  validators?: any[];
};

const InputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

export default InputReducer;
