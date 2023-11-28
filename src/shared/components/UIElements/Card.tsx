import React, { CSSProperties, ReactNode } from 'react';
import './Card.css';

type Props = {
  children?: ReactNode;
  className?: string,
  style?: CSSProperties | undefined
};

const Card = (props: Props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
