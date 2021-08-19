import './Button.scss';

import React from 'react';
import classNames from 'utils/classNames';

interface ButtonProps extends React.PropsWithChildren<any> {
    size?: 'small'|'medium'|'large';
    color?: 'gray'|'black'|'white';
    shape?: 'circle'|'square'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children , size , color, shape, onClick }: ButtonProps): React.ReactElement => {
    return (
        <button
            className={classNames('Button' , size , color, shape )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    size: 'medium',
    color: 'gray',
    shape: 'square'
};

export default Button;