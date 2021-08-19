import './ComponentsPage.scss';
import React from 'react';

import {
    Button,
    Chip
} from 'components';

const ComponentsPage = (): React.ReactElement => {

    return (
        <div className='components_container'>
            <header>
                <h2>컴포넌트 목록</h2>
            </header>
            <main>
                <h4>Buttons</h4>
                <div className='groups'>
                    <Button size='small'>Small BUTTON</Button>
                    <Button size='medium' color='primary'>Medium BUTTON</Button>
                </div>
                <hr />
                <h4>Chip</h4>
                <div className='groups'>
                    <Chip label='Chip Button' />
                </div>
                <hr />

            </main>
        </div>
    );
};

export default ComponentsPage;