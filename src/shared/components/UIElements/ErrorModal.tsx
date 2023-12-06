import React, { MouseEventHandler } from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

type Props = {
  onClear: MouseEventHandler<HTMLElement> | undefined;
  error: any;
};

const ErrorModal = (props: Props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
