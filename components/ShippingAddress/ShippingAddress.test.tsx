import { render } from '@testing-library/react';
import ShippingAddress from '.';

jest.mock('components/ShippingAddressEditor', () => () => 'mock-shipping-address-editor');

describe('ShippingAddress', () => {
  describe('ShippingAddress:View', () => {
    it('renders', () => {
      const { queryByText } = render(<ShippingAddress />);

      expect(queryByText(/mock-shipping-address-editor/)).toBeNull();
    })
  });

  describe('ShippingAddress:Editor', () => {
    it('renders', () => {
      const { queryByText } = render(<ShippingAddress isEditable />);

      expect(queryByText(/mock-shipping-address-editor/)).toBeDefined();
    })
  });
})