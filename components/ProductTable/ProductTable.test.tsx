import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import OrderContext, { IOrderInitialState } from 'contexts/Order';
import { SAMPLE_USER_ORDER } from 'fixtures/index';
import ProductTable from '.';

jest.mock('react-intl', () => ({
  useIntl: jest.fn(() => ({
    formatNumber: jest.fn().mockImplementation((value) => `$${value}`)
  }))
}));
jest.mock('next/image', () => () => (
  <div>mock image</div>
))

const setup = ({
  order = {},
  isEditable
} : {
  order?: Partial<IOrderInitialState>,
  isEditable?: boolean
} = {}) => {
  const mockSetOrder = jest.fn();
  const mockToggleCheckboxAll = jest.fn();
  const mockToggleCheckboxSingle = jest.fn();
  const mockUseState: jest.SpyInstance = jest.spyOn(React, 'useState');
  mockUseState
    .mockImplementation((value) => {
      if (Array.isArray(value)) {
        return [value, mockToggleCheckboxSingle]
      }
      return [value, mockToggleCheckboxAll]
    });
  const wrapper: React.FC<{ children: React.ReactNode}> = ({ children }) => (
    <OrderContext.Provider value={{
      order: {
        ...SAMPLE_USER_ORDER,
        ...order
      },
      setOrder: mockSetOrder
    }}>
      {children}
    </OrderContext.Provider>
  )
  return {
    ...render(<ProductTable isEditable={isEditable} />, { wrapper }),
    mockToggleCheckboxAll,
    mockToggleCheckboxSingle,
    mockSetOrder
  };
}
describe('ProductTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders by default', () => {
    const { queryByTestId, queryAllByTestId } = render(<ProductTable />)

    expect(queryByTestId('product-select-all')).toBeNull();
    expect(queryAllByTestId('product-select')).toHaveLength(0);
    expect(queryAllByTestId('product-item')).toHaveLength(0);
    expect(queryAllByTestId('product-item-quality')).toHaveLength(0);
    expect(queryAllByTestId('product-item-quality-increase')).toHaveLength(0);
    expect(queryAllByTestId('product-item-quality-input')).toHaveLength(0);
    expect(queryAllByTestId('product-item-quality-decrease')).toHaveLength(0);
  });

  describe('ProductTable:View', () => {
    it('renders with context data', () => {
      const { queryByTestId, queryAllByTestId } = setup()

      expect(queryByTestId('product-select-all')).toBeNull();
      expect(queryAllByTestId('product-select')).toHaveLength(0);
      expect(queryAllByTestId('product-item')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality-increase')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality-input')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality-decrease')).toHaveLength(0);
    });

    it('renders with selected products', () => {
      const { queryByTestId, queryAllByTestId } = setup({ order: { productSelected: [true, false] } })

      expect(queryByTestId('product-select-all')).toBeNull();
      expect(queryAllByTestId('product-select')).toHaveLength(0);
      expect(queryAllByTestId('product-item')).toHaveLength(1);
      expect(queryAllByTestId('product-item-quality')).toHaveLength(1);
      expect(queryAllByTestId('product-item-quality-increase')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality-input')).toHaveLength(0);
      expect(queryAllByTestId('product-item-quality-decrease')).toHaveLength(0);
    });
  });

  describe('ProductTable:Editor', () => {
    it('renders', () => {
      const { queryByTestId, queryAllByTestId, mockSetOrder } = setup({ isEditable: true });

      expect(queryByTestId('product-select-all')).toBeDefined();
      expect(queryAllByTestId('product-select')).toHaveLength(2);
      expect(queryAllByTestId('product-item')).toHaveLength(2);
      expect(queryAllByTestId('product-item-quality')).toHaveLength(2);
      expect(queryAllByTestId('product-item-quality-increase')).toHaveLength(2);
      expect(queryAllByTestId('product-item-quality-input')).toHaveLength(2);
      expect(queryAllByTestId('product-item-quality-decrease')).toHaveLength(2);
      const mockSetOrderResult = mockSetOrder.mock.calls[0][0](SAMPLE_USER_ORDER)
      expect(mockSetOrderResult).toEqual({
        ...SAMPLE_USER_ORDER,
        productSelected: [false, false]
      })
    });

    describe('editor interactions', () => {
      it('interacts with "checkbox" product-select-all', () => {
        const { getByTestId, mockToggleCheckboxAll, mockToggleCheckboxSingle } = setup({ isEditable: true });
        expect(getByTestId('product-select-all')).toBeDefined();

        act(() => {
          fireEvent.click(getByTestId('product-select-all'));
        });

        expect(mockToggleCheckboxAll).toHaveBeenCalledWith(true)
        expect(mockToggleCheckboxSingle).toHaveBeenCalledWith([true, true])
      });

      it('interacts with "checkbox" in first product', () => {
        const { getAllByTestId, mockToggleCheckboxAll, mockToggleCheckboxSingle } = setup({ isEditable: true });

        expect(getAllByTestId('product-select')).toHaveLength(2);

        act(() => {
          fireEvent.click(getAllByTestId('product-select')[0]);
        });

        const mockToggleCheckboxSingleResult = mockToggleCheckboxSingle.mock.calls[0][0]([false, false])
        expect(mockToggleCheckboxSingleResult).toEqual([true, false])
        expect(mockToggleCheckboxAll).toHaveBeenCalledWith(false)
      });

      describe('interaction of quantity first product', () => {
        it('renders', () => {
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          expect(getAllByTestId('product-item-quality')).toHaveLength(2);
          expect(getAllByTestId('product-item-quality-increase')).toHaveLength(2);
          expect(getAllByTestId('product-item-quality-input')).toHaveLength(2);
          expect(getAllByTestId('product-item-quality-decrease')).toHaveLength(2);
        });

        it('decrease quantity', () => {
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          act(() => {
            fireEvent.click(getAllByTestId('product-item-quality-decrease')[0]);
          });

          expect(mockSetOrder).toHaveBeenCalledWith({
            ...SAMPLE_USER_ORDER,
            productList: SAMPLE_USER_ORDER.productList.map((product, index) => (index === 0 ? {
              ...product,
              quantity: 1,
            } : product)),
            isDirty: true
          });
        });

        it('increase quantity', () => {
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          act(() => {
            fireEvent.click(getAllByTestId('product-item-quality-increase')[0]);
          });

          expect(mockSetOrder).toHaveBeenCalledWith({
            ...SAMPLE_USER_ORDER,
            productList: SAMPLE_USER_ORDER.productList.map((product, index) => (index === 0 ? {
              ...product,
              quantity: 2,
            } : product)),
            isDirty: true
          });
        });

        it('input quantity', () => {
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          act(() => {
            fireEvent.change(getAllByTestId('product-item-quality-input')[0], { target: { value: 10 }});
          });

          expect(mockSetOrder).toHaveBeenCalledWith({
            ...SAMPLE_USER_ORDER,
            productList: SAMPLE_USER_ORDER.productList.map((product, index) => (index === 0 ? {
              ...product,
              quantity: 10,
            } : product)),
            isDirty: true
          });
        });

        it('input quantity but not number', () => {
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          act(() => {
            fireEvent.change(getAllByTestId('product-item-quality-input')[0], { target: { value: 'ab' }});
          });

          expect(mockSetOrder).not.toHaveBeenCalledWith({
            ...SAMPLE_USER_ORDER,
            productList: SAMPLE_USER_ORDER.productList.map((product, index) => (index === 0 ? {
              ...product,
              quantity: 'ab',
            } : product)),
            isDirty: true
          });
        });
      });

      describe('interaction of removing second product', () => {
        it('removes second product successfully', async () => {
          const mockConfirm = jest.spyOn(window, 'confirm');
          mockConfirm.mockReturnValue(true);
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          await act(() => {
            fireEvent.click(getAllByTestId('product-item-quality-decrease')[1]);
          });

          expect(mockSetOrder).toHaveBeenCalledWith(mockSetOrder.mock.calls[1][0]);
          expect(mockSetOrder).toHaveBeenCalledTimes(2);
        });

        it('cancels removing second product', async () => {
          const mockConfirm = jest.spyOn(window, 'confirm');
          mockConfirm.mockReturnValue(false);
          const { getAllByTestId, mockSetOrder } = setup({ isEditable: true });

          await act(() => {
            fireEvent.click(getAllByTestId('product-item-quality-decrease')[1]);
          });

          expect(mockSetOrder).toHaveBeenCalledTimes(1);
        });
      })
    })
  });
})