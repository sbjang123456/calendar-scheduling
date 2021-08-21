import './Dialog.scss';

import React from 'react';
import { classNames } from 'utils';

interface DialogControlProps extends React.PropsWithChildren<any> {
    size?: 'small' | 'medium' | 'large';
    onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DialogControl = ({ children, size, onClose }: DialogControlProps): React.ReactElement => {
    const handleClickStop = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
    };

    return (
        <div role='presentation' className='Dialog'>
            <div className='backdrop' />
            <div className='container' role='none presentation' onClick={onClose}>
                <div className={classNames('paper', size)} role='dialog' onClick={handleClickStop}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface DialogProps extends DialogControlProps {
    open: boolean;
}

const Dialog = ({ open, ...others }: DialogProps): React.ReactElement => {
    return (
        <>
            {open && <DialogControl {...others} />}
        </>
    );
};

Dialog.defaultProps = {
    size: 'small'
};

export default Dialog;