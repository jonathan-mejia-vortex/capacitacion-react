import React, { MouseEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

type Props = {
  onClick: MouseEventHandler<HTMLElement> | undefined;
  show: boolean;
  children: ReactNode;
};

const SideDrawer = (props: Props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as Element
  );
};

export default SideDrawer;
