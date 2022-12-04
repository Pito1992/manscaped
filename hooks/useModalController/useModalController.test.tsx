import { renderHook, act } from '@testing-library/react/pure';
import useModalController from '.';

describe('useModalController', () => {
  const { result, rerender } = renderHook(() => useModalController());

  it('has default value', () => {
    expect(result.current.isVisibleModal).toEqual(false);
  });

  it('should open Modal', () => {
    act(() => {
      result.current.openModal();
    })

    rerender();

    expect(result.current.isVisibleModal).toEqual(true)
  });

  it('should close Modal', () => {
    act(() => {
      result.current.closeModal();
    })

    rerender();

    expect(result.current.isVisibleModal).toEqual(false)
  });

  it('should toggle Modal', () => {
    act(() => {
      result.current.toggleModal();
    })

    rerender();

    expect(result.current.isVisibleModal).toEqual(true)
  });
})