import './Grid.scss';

import React from 'react';
import { classNames } from 'utils';

interface GridProps extends React.PropsWithChildren<any> {
    container?: boolean;
    item?: boolean;
    size?: number;
    style?: any;
}

const Grid = ({ children, container, item, size, style }: GridProps): React.ReactElement => {
    const handleClickStop = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
    };

    return (
        <div
            role='grid'
            className={classNames(
                'Grid',
                container && 'grid-container',
                item && 'grid-item',
                size && `grid-size-${size}`
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export default Grid;