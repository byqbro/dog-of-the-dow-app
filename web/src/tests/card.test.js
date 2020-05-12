import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../components/Card/Card';
import { idText } from 'typescript';
import { exportAllDeclaration } from '@babel/types';

it('card shows a header and footer', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Card />, div);
    expect(div.innerHTML).toContain('card');

    ReactDOM.unmountComponentAtNode(div);
});