import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import UserContext, { UserContextProvider } from '.';

const mockSetUser = jest.fn();

const MockComponent = () => {
  const { setUser } = useContext(UserContext);
  const onClick = () => setUser({});
  return <button onClick={onClick}>a mock component</button>
};

describe('UserContext', () => {
  it('renders', async () => {
    const mockUseState = jest.spyOn(React, 'useState');
    mockUseState.mockImplementation(() => [{}, mockSetUser])
    const { container, getByText } = render((
      <UserContextProvider>
        <MockComponent />
      </UserContextProvider>
    ));

    expect(getByText(/a mock component/)).toBeDefined();

    await act(() => {
      fireEvent.click(container.querySelector('button')!)
    });
    expect(mockSetUser).toHaveBeenCalled();
  });
})