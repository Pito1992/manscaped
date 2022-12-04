import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Portal from ".";

describe('Portal', () => {
  let mockCreatePortal: jest.SpyInstance;
  let mockUseRef: jest.SpyInstance;
  let mockDivEl: HTMLDivElement;

  beforeEach(() => {
    mockCreatePortal = jest.spyOn(ReactDOM, 'createPortal');
    mockUseRef = jest.spyOn(React, 'useRef');
    mockDivEl = document.createElement('div');
    mockDivEl.remove = jest.fn();
  });

  it('renders by default', () => {
    jest.spyOn(document.body, 'appendChild');
    mockUseRef.mockReturnValue(({ current: mockDivEl }));

    const { unmount } = render(<Portal />);
    expect(document.body.appendChild).toHaveBeenCalledWith(mockDivEl);
    expect(mockCreatePortal).toHaveBeenCalledWith(undefined, mockDivEl);

    unmount();
    expect(mockDivEl.remove).toHaveBeenCalled();
  });

  it('renders with props', () => {
    document.getElementById = jest.fn().mockReturnValue({
      appendChild: jest.fn(),
    })
    const MockComponent = () => <div>test</div>;
    mockUseRef.mockReturnValue(({ current: mockDivEl }));
    const { baseElement } = render(<div id="app" />);
    const { baseElement: baseElementChild, unmount } = render(<Portal elementId="app"><MockComponent /></Portal>, {
      baseElement
    });

    expect(document.getElementById("app")?.appendChild).toHaveBeenCalledWith(mockDivEl);
    expect(mockCreatePortal).toHaveBeenCalledWith(<MockComponent />, mockDivEl)

    unmount();
    expect(mockDivEl.remove).toHaveBeenCalled();
  });
})