import { render, act, fireEvent } from '@testing-library/react';
import OrderContext from 'contexts/Order';
import { SAMPLE_USER_ORDER } from 'fixtures/index';
import OrderCheckoutEmptyCart from '.';

const mockRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockRouterPush
  }))
}));
jest.mock('next/dynamic', () => jest.fn(() => ({ children }: any) => children));

describe('OrderCheckoutEmptyCart', () => {
  it('renders', () => {
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: {
          ...SAMPLE_USER_ORDER,
          productSelected: [true, true]
        },
        setOrder: jest.fn()
      }}>
        {children}
      </OrderContext.Provider>
    )
    const { container } = render(<OrderCheckoutEmptyCart />, { wrapper });

    expect(container.firstChild).toBeNull();
  })

  it('clicks on "Cancel" button', () => {
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: SAMPLE_USER_ORDER,
        setOrder: jest.fn()
      }}>
        {children}
      </OrderContext.Provider>
    )
    const { container, getByTestId } = render(<OrderCheckoutEmptyCart />, { wrapper });

    expect(container.firstChild).toBeDefined();

    act(() => {
      fireEvent.click(getByTestId('redirect-cart-page'));
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/cart')
  })
})