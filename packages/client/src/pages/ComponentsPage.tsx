import './ComponentsPage.scss';
import React, { useState } from 'react';

import {
    Button,
    Chip,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogAction
} from 'components';

const ComponentsPage = (): React.ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickToggle = () => {
        setOpen(!open);
    };

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
                <h4>Dialog</h4>
                <div className='groups'>
                    <Button onClick={handleClickToggle}>Dialog Open</Button>
                    <Dialog
                        open={open}
                        onClose={handleClickToggle}
                    >
                        <DialogTitle onClose={handleClickToggle}>
                            다이얼로그 제목
                        </DialogTitle>
                        <DialogContent>
                            다이얼로그 창 Content
                        </DialogContent>
                        <DialogAction>
                            <Button>취소</Button>
                            <Button color='black'>확인</Button>
                        </DialogAction>
                    </Dialog>
                </div>

            </main>
        </div>
    );
};

export default ComponentsPage;