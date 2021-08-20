import React from 'react';

const DialogContent = ({ children }: React.PropsWithChildren<any>): React.ReactElement => {
    return (
        <div className='content'>
            {children}
        </div>
    );
};

export default DialogContent;