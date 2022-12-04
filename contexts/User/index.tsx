import React from 'react';
import type { IUserData } from 'types';

export interface IUserInitialState extends Partial<IUserData> {}
export const initialState = {} as IUserInitialState;

export interface IUserContext {
  user: IUserInitialState;
  setUser: React.Dispatch<React.SetStateAction<IUserInitialState>>;
}

const UserContext = React.createContext<IUserContext>({
  user: initialState,
  setUser: /* istanbul ignore next */  () => {}
});

export function UserContextProvider({ children, value = initialState }: React.PropsWithChildren<{ value?: IUserInitialState }>): JSX.Element {
  const [state, setUser] = React.useState(value);

  return (
    <UserContext.Provider value={{ user: state, setUser }}>
      {children}
    </UserContext.Provider>
  )
}


export default UserContext;
