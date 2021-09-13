import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow.js';
jest.mock('./../../api/fetchShow.js');

const testShow = {
    name: "",
    summary: "",
    seasons: [{
        id: 1,
        name: "Rise of the Demo-dogs",
        episodes: [],
    },
    {
        id: 2,
        name: "Return of the Nerdy Teens",
        episodes: [],
    },
    {
        id: 3,
        name: "The Legend of Hawkins",
        episodes: [],
    }],

}


test('the Display component renders without any passed props', () => {
    render(<Display/>);
})

test('show component displays when fetch button clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display/>);

    const button = screen.getByRole('button');

    userEvent.click(button);

    const show = await screen.findByTestId('show-container');

    expect(show).toBeInTheDocument();
})

test('select options rendered is equal to number of seasons in test data when fetch button clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display/>);

    const button = screen.getByRole('button');

    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(3); 
    })
})

test('function is called when fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);

    const button = screen.getByRole('button');

    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toBeCalled();
    })
})


///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.