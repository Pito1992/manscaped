import { fireEvent, render, act } from '@testing-library/react';
import OrderCheckoutActions from '.';

const mockRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockRouterPush
  }))
}));

describe('OrderCheckoutActions', () => {
  it('renders', () => {
    const { getAllByTestId } = render(<OrderCheckoutActions />);

    expect(getAllByTestId('open-modal')).toHaveLength(4);
  })

  it('clicks on "Cancel" button', async () => {
    const { getAllByTestId, queryByTestId } = render(<OrderCheckoutActions />);
    const button = getAllByTestId('open-modal')[0];

    await act(() => {
      fireEvent.click(button);
    });
    expect(queryByTestId('modal')).toBeDefined();

    await act(() => {
      fireEvent.click(queryByTestId('modal-ok')!);
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/cart')
  })
})