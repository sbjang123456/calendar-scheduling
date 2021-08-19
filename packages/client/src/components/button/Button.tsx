import './Button.scss';

import React from 'react';
import classNames from 'utils/classNames';

interface ButtonProps extends React.PropsWithChildren<any> {
    size?: string;
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children , size , color, onClick }: ButtonProps): React.ReactElement => {
    return (
        <button
            className={classNames('Button' , size , color )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    size: 'medium',
    color: 'default'
};

export default Button;