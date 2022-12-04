import { act, fireEvent, render } from "@testing-library/react";
import OrderContext from 'contexts/Order';
import { SAMPLE_USER_ORDER } from 'fixtures/index';
import OrderCardActions from '.';

const mockSetOrder = jest.fn();
const mockOpenModal = jest.fn();
const mockCloseModal = jest.fn();
jest.mock('hooks/useModalController', () => {
  const originalModule = jest.requireActual('hooks/useModalController');

  return {
    __esModule: true,
    default: jest.fn(() => {
      const result = originalModule.default()
      return {
        ...result,
        openModal: mockOpenModal.mockImplementation(result.openModal),
        closeModal: mockCloseModal.mockImplementation(result.closeModal)
      }
    })
  }
});
const mockRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockRouterPush
  }))
}));

describe('OrderAction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('renders by default', () => {
    const { queryByTestId } = render(<OrderCardActions />)

    expect(queryByTestId('check-out')).toBeDefined();
    expect(queryByTestId('modal')).toBeNull();
  });

  it('shows and closes Modal', async () => {
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: SAMPLE_USER_ORDER,
        setOrder: mockSetOrder
      }}>
        {children}
      </OrderContext.Provider>
    )
    const { queryByTestId, getByTestId } = render(<OrderCardActions />, { wrapper });

    await act(() => {
      fireEvent.click(getByTestId('check-out'));
    });

    expect(mockOpenModal).toHaveBeenCalled();
    expect(queryByTestId('modal')).toBeDefined();

    await act(() => {
      fireEvent.click(getByTestId('modal-btn-close'));
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(queryByTestId('modal')).toBeNull();
  });

  it('checks out', async () => {
    const mockOrder = {
      ...SAMPLE_USER_ORDER,
      productSelected: [true, true]
    }
    const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
      <OrderContext.Provider value={{
        order: mockOrder,
        setOrder: mockSetOrder,
      }}>
        {children}
      </OrderContext.Provider>
    )
    jest.spyOn(Date, 'now').mockImplementation(() => 1912199200000);
    const { queryByTestId, getByTestId } = render(<OrderCardActions />, { wrapper });

    await act(() => {
      fireEvent.click(getByTestId('check-out'));
    });

    expect(mockSetOrder).toHaveBeenCalledWith({
      ...mockOrder,
      lastUpdatedAt: 1912199200000,
      isDirty: false
    });
    expect(queryByTestId('modal')).toBeNull();
    jest.runOnlyPendingTimers();
    expect(mockRouterPush).toHaveBeenCalledWith('/checkout')
  });

  describe('Modal interactions', () => {
    it('clicks on "Ok" button', async () => {
      const { getByTestId } = render(<OrderCardActions />)

      await act(() => {
        fireEvent.click(getByTestId('check-out'));
      });

      await act(() => {
        fireEvent.click(getByTestId('modal-ok'));
      });

      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
});
