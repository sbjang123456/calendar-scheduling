import './ComponentsPage.scss';
import React from 'react';

import {
    Button,
    Chip,
    ButtonGroup
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
                    <div className='area'>
                        <div className='row'>
                            <Button size='small'>Small BUTTON</Button>
                            <Button color='black'>Medium BUTTON</Button>
                            <Button size='large' color='white'>Large BUTTON</Button>
                        </div>
                        <div className='row'>
                            <Button size='large' color='white' shape='circle'>{'<'}</Button>
                            <Button size='large' color='white' shape='circle'>{'>'}</Button>
                        </div>
                        <div className='row'>
                            <ButtonGroup>
                                <Button color='black'>월</Button>
                                <Button color='white'>주</Button>
                            </ButtonGroup>
                        </div>
                        <div className='row'>
                            <Chip label='Chip Button' />
                        </div>
                    </div>

                </div>
                {/*<hr />*/}
                <h4>Dialog</h4>
                <div className='groups'>
                </div>
                {/*<hr />*/}

            </main>
        </div>
    );
};

export default ComponentsPage;