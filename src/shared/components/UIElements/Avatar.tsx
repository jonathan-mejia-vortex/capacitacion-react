import React, { CSSProperties } from 'react';

import './Avatar.css';

type Props = {
  width?: string | number;
  alt?: string | undefined;
  image: string | undefined;
  style?: CSSProperties | undefined;
  className?: string;
};

const Avatar = (props: Props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
