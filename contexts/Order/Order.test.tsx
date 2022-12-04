import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import OrderContext, { OrderContextProvider } from '.';

const mockSetOrder = jest.fn();

const MockComponent = () => {
  const { setOrder } = useContext(OrderContext);
  const onClick = () => setOrder({});
  return <button onClick={onClick}>a mock component</button>
};

describe('OrderContext', () => {
  it('renders', async () => {
    const mockUseState = jest.spyOn(React, 'useState');
    mockUseState.mockImplementation(() => [{}, mockSetOrder])
    const { container, getByText } = render((
      <OrderContextProvider>
        <MockComponent />
      </OrderContextProvider>
    ));

    expect(getByText(/a mock component/)).toBeDefined();

    await act(() => {
      fireEvent.click(container.querySelector('button')!)
    });
    expect(mockSetOrder).toHaveBeenCalled();
  });
})