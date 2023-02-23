import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App.js';

describe('App', () => {
    test('renders App Title', () => {
        render(<App/>);
        const title = screen.getByText('Todo App');
        expect(title).toBeInTheDocument();
    });
});

  
  