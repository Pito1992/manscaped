import React from 'react';
import { render } from '@testing-library/react';
import OrderContext from 'contexts/Order';
import OrderStatus from '.';
import { SAMPLE_USER_ORDER } from 'fixtures/index';

describe('OrderStatus', () => {
  it('renders', () => {
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: {
          ...SAMPLE_USER_ORDER,
          statuses: ['SUBSCRIPTION_ORDER', 'PAID', 'UNFULFILLED'],
        },
        setOrder: jest.fn()
      }}>
        {children}
      </OrderContext.Provider>
    )
    const { queryByTestId, getByText } = render(<OrderStatus />, { wrapper });

    expect(queryByTestId('status')?.children).toHaveLength(3);
    expect(getByText('SUBSCRIPTION_ORDER')).toBeDefined();
    expect(getByText('PAID')).toBeDefined();
    expect(getByText('UNFULFILLED')).toBeDefined();
  });

  it('renders without empty status', () => {
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: {
          ...SAMPLE_USER_ORDER,
          statuses: []
        },
        setOrder: jest.fn()
      }}>
        {children}
      </OrderContext.Provider>
    )
    const { queryByTestId } = render(<OrderStatus />, { wrapper });

    expect(queryByTestId('status')?.children).toHaveLength(0);
  });
})