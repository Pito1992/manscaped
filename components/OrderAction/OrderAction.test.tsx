import { act, fireEvent, render } from "@testing-library/react";
import OrderAction from '.';

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
})

describe('OrderAction', () => {
  it('renders by default', () => {
    const { queryByTestId } = render(<OrderAction title="Check out" body="this is a body content" />)

    expect(queryByTestId('modal')).toBeNull();
    expect(queryByTestId('open-modal')).toBeDefined();
  });

  it('shows and closes Modal', async () => {
    const { queryByTestId, getByTestId } = render(<OrderAction title="Check out" body="this is a body content" />)

    await act(() => {
      fireEvent.click(getByTestId('open-modal'));
    });

    expect(mockOpenModal).toHaveBeenCalled();
    expect(queryByTestId('modal')).toBeDefined();

    await act(() => {
      fireEvent.click(getByTestId('modal-btn-close'));
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(queryByTestId('modal')).toBeNull();
  })

  describe('Modal interactions', () => {
    it('clicks on "Ok" button by default', async () => {
      const { getByTestId } = render(<OrderAction title="Check out" body="this is a body content" />)

      await act(() => {
        fireEvent.click(getByTestId('open-modal'));
      });

      await act(() => {
        fireEvent.click(getByTestId('modal-ok'));
      });

      expect(mockCloseModal).toHaveBeenCalled();
    });

    it('clicks on "Ok" button with prop "onClick"', async () => {
      const mockOnClick = jest.fn();
      const { getByTestId } = render(<OrderAction title="Check out" body="this is a body content" onClick={mockOnClick} />)

      await act(() => {
        fireEvent.click(getByTestId('open-modal'));
      });

      await act(() => {
        fireEvent.click(getByTestId('modal-ok'));
      });

      expect(mockOnClick).toHaveBeenCalled();
    });

    it('clicks on "Cancel" button', async () => {
      const mockOnClick = jest.fn();
      const { getByTestId } = render(<OrderAction title="Check out" body="this is a body content" onClick={mockOnClick} />)

      await act(() => {
        fireEvent.click(getByTestId('open-modal'));
      });

      await act(() => {
        fireEvent.click(getByTestId('modal-cancel'));
      });

      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
});
