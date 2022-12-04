import { render, fireEvent, act } from "@testing-library/react";
import Breadcrumbs from ".";

describe('Breadcrumbs', () => {
  it('renders', () => {
    const mockData = [{
      name: 'Card',
      href: '/cart'
    }, {
      name: 'Check out',
      href: '/checkout'
    }]
    const { getByText } = render(<Breadcrumbs data={mockData} />);

    expect(getByText('Card')).toBeDefined();
    expect(getByText('Check out')).toBeDefined();
  })
})