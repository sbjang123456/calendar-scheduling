import './Grid.scss';

import React from 'react';
import { classNames } from 'utils';

interface GridProps extends React.PropsWithChildren<any> {
    container?: boolean;
    item?: boolean;
    size?: 2 | 3 | 4 | 6 | 12;
    style?: any;
}

const Grid = ({ children, container, item, size, style }: GridProps): React.ReactElement => {
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