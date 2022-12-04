import { render } from '@testing-library/react';
import OrderContext from 'contexts/Order';
import { SAMPLE_USER_ORDER } from 'fixtures/index';
import OrderCard from '.';

jest.mock('components/OrderStatus', () => () => 'MockOrderStatus');
jest.mock('components/ProductTable', () => () => 'MockProductTable');
jest.mock('components/ShippingAddress', () => () => 'MockShippingAddress');
jest.mock('components/OrderCardActions', () => () => 'MockOrderCardActions');
jest.mock('components/OrderCheckoutActions', () => () => 'MockOrderCheckoutActions');
jest.mock('components/OrderCheckoutEmptyCart', () => () => 'MockOrderCheckoutEmptyCart');

describe('OrderCard', () => {
  const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
    <OrderContext.Provider value={{
      order: SAMPLE_USER_ORDER,
      setOrder: jest.fn()
    }}>
      {children}
    </OrderContext.Provider>
  )
  it('renders OrderCard:View', () => {
    const { queryByText } = render(<OrderCard />, { wrapper });

    expect(queryByText('US5426899')).toBeDefined();
    expect(queryByText(/Created on Mar, 6th 2021/)).toBeDefined();
    expect(queryByText(/Last updated on Mar, 6th 2021/)).toBeDefined();
    expect(queryByText(/MockProductTable/)).toBeDefined();
    expect(queryByText(/MockShippingAddress/)).toBeDefined();
    expect(queryByText(/MockOrderStatus/)).toBeDefined();
    expect(queryByText(/MockOrderCheckoutActions/)).toBeDefined();
    expect(queryByText(/MockOrderCheckoutEmptyCart/)).toBeDefined();
    expect(queryByText(/MockOrderCardActions/)).toBeNull();
  })

  it('renders OrderCard:Editor', () => {
    const { queryByText } = render(<OrderCard isEditable />, { wrapper });

    expect(queryByText('US5426899')).toBeDefined();
    expect(queryByText(/Created on Mar, 6th 2021/)).toBeDefined();
    expect(queryByText(/Last updated on Mar, 6th 2021/)).toBeDefined();
    expect(queryByText(/MockProductTable/)).toBeDefined();
    expect(queryByText(/MockShippingAddress/)).toBeDefined();
    expect(queryByText(/MockOrderStatus/)).toBeDefined();
    expect(queryByText(/MockOrderCheckoutActions/)).toBeNull();
    expect(queryByText(/MockOrderCheckoutEmptyCart/)).toBeNull();
    expect(queryByText(/MockOrderCardActions/)).toBeDefined();
  })
})
