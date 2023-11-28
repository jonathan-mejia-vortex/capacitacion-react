import React, {
  CSSProperties,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

type Props = {
  /** MODAL */
  show: boolean;
  onCancel: MouseEventHandler<HTMLDivElement> | undefined;
  /** OVERLAY */
  children?: ReactNode;
  footerClass?: string;
  footer?: ReactNode;
  contentClass?: string;
  className?: string;
  style?: CSSProperties | undefined;
  headerClass?: string;
  header?: ReactNode;
  onSubmit?: FormEventHandler<Element> | undefined;
};

const ModalOverlay = (props: Props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDom.createPortal(
    content,
    document.getElementById("modal-hook") as Element
  );
};

const Modal = (props: Props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
