import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

type Props = {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
};

const Backdrop = (props: Props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook') as Element
  );
};

export default Backdrop;
