import './ComponentsPage.scss';
import React, { useState } from 'react';

import {
    Button,
    Chip,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogAction,
    TextBox,
    SelectBox,
    TimeSelectBox,
    Grid
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
                <h4>Form Controls</h4>
                <div className='groups'>
                    <div className='area'>
                        <div className='row'>
                            <TextBox
                                label='텍스트상자'
                                fullWidth
                            />
                        </div>
                        <div className='row'>
                            <SelectBox
                                label='선택상자'
                            >
                                <option>테스트입니다1</option>
                                <option>테스트입니다2</option>
                                <option>테스트입니다3</option>
                                <option>테스트입니다4</option>
                            </SelectBox>
                        </div>
                        <div className='row'>
                            <TimeSelectBox
                                label='시간 선택'
                            />
                        </div>
                    </div>
                </div>
                <h4>Grid</h4>
                <div className='groups'>
                    <Grid container>
                        <Grid item size={6} style={{ border: '1px solid #000' }}>
                            t
                        </Grid>
                        <Grid item size={6} style={{ border: '1px solid #000' }}>
                            t
                        </Grid>
                    </Grid>
                </div>

            </main>
        </div>
    );
};

export default ComponentsPage;