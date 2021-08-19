import './ButtonGroup.scss';

import React from 'react';
import classNames from 'utils/classNames';

interface ButtonProps extends React.PropsWithChildren<any> {
    shape?: 'rounded|squared'
}

const ButtonGroup = ({ children , shape }: ButtonProps): React.ReactElement => {
    return (
        <div className={classNames('ButtonGroup' , shape )}>
            {children}
        </div>
    );
}

ButtonGroup.defaultProps = {
    shape: 'rounded',
};

export default ButtonGroup;