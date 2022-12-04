import React from 'react';
import type { IOrderData } from 'types';

export interface IOrderInitialState extends Partial<IOrderData> {
  isDirty?: boolean;
  productSelected?: boolean[];
}

export const initialState = {} as IOrderInitialState;

export interface IOrderContext {
  order: IOrderInitialState;
  setOrder: React.Dispatch<React.SetStateAction<IOrderInitialState>>;
}

const OrderContext = React.createContext<IOrderContext>({
  order: initialState,
  setOrder: /* istanbul ignore next */ () => {}
});

export function OrderContextProvider({ children, value = initialState }: React.PropsWithChildren<{ value?: IOrderInitialState }>): JSX.Element {
  const [state, setOrder] = React.useState(value);

  return (
    <OrderContext.Provider value={{ order: state, setOrder }}>
      {children}
    </OrderContext.Provider>
  )
}


export default OrderContext;
