import { fireEvent, render, waitFor } from '@testing-library/react';
import dynamic from 'next/dynamic';
import Modal from '.';

jest.mock('components/Portal', () => 'MockPortal');
jest.mock('components/Loading', () => 'MockLoading');

jest.mock('next/dynamic', () => jest.fn(() => {
  const MockComp = ({ children }: any) => children;
  return MockComp
}));


describe('Modal', () => {
  it("renders by default", () => {
    const { container } = render(<Modal />);

    expect(container.firstChild).toBeNull();
  });

  it("renders dynamic components", async () => {
    const mockNextDynamic = jest.mocked<any>(dynamic);
    const { container, getByTestId } = render(<Modal visible />);

    expect(container.firstChild).toBeDefined();

    expect(getByTestId('modal')).toBeDefined();
    expect(getByTestId('modal-overlay')).toBeDefined();
    expect(getByTestId('modal-btn-close')).toBeDefined();

    const portalComp = await waitFor(() => mockNextDynamic.mock.calls[0][0]());
    expect(portalComp.default).toEqual('MockPortal');

    const loadingComp = mockNextDynamic.mock.calls[0][1].loading();
    expect(loadingComp.type).toEqual('MockLoading');
  })

  it("renders with content", () => {
    const { getByText } = render(
      <Modal
        visible
        header="test-header"
        body="test-body"
        footer="test-footer"
      />
    );

    expect(getByText(/test-header/)).toBeTruthy();
    expect(getByText(/test-body/)).toBeTruthy();
    expect(getByText(/test-footer/)).toBeTruthy();
  });

  it("closes the Modal", () => {
    const mockOnClose = jest.fn();
    const { container, getByTestId, getByText, rerender } = render(
      <Modal
        visible
        onClose={mockOnClose}
      />
    );

    fireEvent.click(getByTestId('modal-btn-close'));
    expect(mockOnClose).toHaveBeenCalled();

    fireEvent.click(getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });
})