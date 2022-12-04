import { act, fireEvent, createEvent, render } from '@testing-library/react';
import UserContext from 'contexts/User';
import { SAMPLE_USER_PROFILE } from 'fixtures/index';
import ShippingAddressEditor from '.';

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
jest.mock('next/dynamic', () => jest.fn(() => ({ children }: any) => children));

const setup = () => {
  const mockSetUser = jest.fn();
  const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
    <UserContext.Provider value={{
      user: SAMPLE_USER_PROFILE,
      setUser: mockSetUser
    }}>
      {children}
    </UserContext.Provider>
  );

  return {
    ...render(<ShippingAddressEditor />, { wrapper }),
    mockSetUser
  }
}

describe('ShippingAddressEditor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders by default', () => {
    const { queryByTestId } = render(<ShippingAddressEditor />);

    expect(queryByTestId("open-shipping-address-editor")).toBeDefined();
    expect(queryByTestId("modal-shipping-address-editor")).toBeNull();
  });

  it('renders with context data', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId("open-shipping-address-editor")).toBeDefined();
    expect(queryByTestId("modal-shipping-address-editor")).toBeNull();
  });

  it('shows Modal', () => {
    const { queryByTestId, getByTestId } = setup();

    act(() => {
      fireEvent.click(getByTestId('open-shipping-address-editor'));
    });

    expect(queryByTestId("open-shipping-address-editor")).toBeDefined();
    expect(queryByTestId("modal-shipping-address-editor")).toBeDefined();
    expect(queryByTestId(/Shipping Address Editor/)).toBeDefined();
    expect(queryByTestId("editor-form")).toBeDefined();
    expect(queryByTestId("editor-submit")).toBeDefined();
    expect(queryByTestId("editor-cancel")).toBeDefined();
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it('closes Modal', async () => {
    const { queryByTestId, getByTestId } = setup();

    await act(() => {
      fireEvent.click(getByTestId('open-shipping-address-editor'));
    });
    await act(() => {
      fireEvent.click(getByTestId('editor-cancel'));
    });

    expect(queryByTestId("open-shipping-address-editor")).toBeDefined();
    expect(queryByTestId("modal-shipping-address-editor")).toBeNull();
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('saves Modal', async () => {
    const mockRequestSubmit = jest.fn();
    const mockPreventDefault = jest.fn();
    const mockSetState = jest.fn();

    const { getByTestId, mockSetUser } = setup();

    await act(() => {
      fireEvent.click(getByTestId('open-shipping-address-editor'));
    });
    await act(() => {
      fireEvent.submit(getByTestId('editor-form'));
    });

    expect(mockSetUser).toHaveBeenCalledWith(SAMPLE_USER_PROFILE)
    expect(mockCloseModal).toHaveBeenCalled();
  });
})