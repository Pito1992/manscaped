import { render } from "@testing-library/react";
import Button from ".";

describe('Button', () => {
  it('renders', () => {
    const { getByText, getByTestId } = render(<Button className='testClassName'>Test</Button>);
    expect(getByText('Test')).toBeDefined();
    expect(getByTestId('button').className).toContain('testClassName');
  })
})