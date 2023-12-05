import { useCallback, useReducer } from "react";

type State = {
  inputs: any;
  isValid: boolean;
};

type InputAction = {
  type: string;
  value?: any;
  inputId: string;
  isValid?: boolean;
};

type NewAction = {
  type: string;
  inputs: any;
  formIsValid: boolean;
};

const formReducer = (state: State, action: InputAction | NewAction) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      action = action as InputAction;
      let formIsValid: boolean = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && (action.isValid ? action.isValid : false);
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      action = action as NewAction;
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs: any, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData: any, formValidity: boolean) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return { formState, inputHandler, setFormData };
};
