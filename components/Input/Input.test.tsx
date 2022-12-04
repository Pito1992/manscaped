import React from 'react';
import { render } from "@testing-library/react";
import Input from ".";


describe('Input', () => {
  let mockUseId: jest.SpyInstance;
  beforeEach(() => {
    mockUseId = jest.spyOn(React, 'useId');
    mockUseId.mockReturnValue('mockId');
  })

  it('renders by default', () => {
    const { queryByTestId, getByTestId } = render(<Input />);

    expect(queryByTestId('label')).toBeNull();
    expect(getByTestId('input')).toBeDefined();
    expect(mockUseId).toHaveBeenCalled();
    expect(getByTestId('input').id).toEqual('mockId');
  });

  it('renders with props', () => {
    const { getByTestId } = render(<Input containerClassName='containerClassName' label='label text' id='testId' />);
    expect(getByTestId('label')).toBeDefined();
    expect(getByTestId('label').innerHTML).toEqual('label text');
    expect(getByTestId('input')).toBeDefined();
    expect(mockUseId).toHaveBeenCalled();
    expect(getByTestId('input').id).toEqual('testId');
  });
})