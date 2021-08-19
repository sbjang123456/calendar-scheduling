import React from 'react';

const DialogAction = ({ children }: React.PropsWithChildren<any>): React.ReactElement => {
    return (
        <div className="action">
            {children}
        </div>
    );
}

export default DialogAction;