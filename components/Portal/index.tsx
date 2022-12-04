import React from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  elementId?: string;
}

// Should be import lazily and without server-side rendering
function Portal({ children, elementId }: IPortalProps): JSX.Element {
  const elRoot = (elementId ? document.getElementById(elementId) : document.body) as HTMLElement;
  const ref = React.useRef<HTMLDivElement>(document.createElement('div'));

  React.useEffect(() => {
    elRoot.appendChild(ref.current);

    return () => {
      ref.current.remove();
    };
  }, [elRoot]);


  return createPortal(children, ref.current);
}

export default Portal;