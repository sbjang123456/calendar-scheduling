import React from 'react';
import { Button } from 'components';

interface DialogControlProps extends React.PropsWithChildren<any> {
    onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DialogTitle = ({ children, onClose }: DialogControlProps): React.ReactElement => {
    return (
        <div className='title'>
            <h6 className='label'>{children}</h6>
            {onClose && <Button onClick={onClose} color='white' shape='circle'>X</Button>}
        </div>
    );
};

export default DialogTitle;