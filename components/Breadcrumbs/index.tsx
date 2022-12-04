import React from 'react';
import Link from 'next/link';
import Home from 'assets/images/home.svg'
import { HOME } from 'constants/routes';

interface IBreadcrumbs extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{
    name: string;
    href: string;
  }>;
}

function Breadcrumbs({ data }: IBreadcrumbs) {
  const lastIndex = data.length - 1;

  return (
    <nav className="w-full mt-6 mb-6 px-3 sm:px-0">
      <ol className="list-reset flex items-center text-sm sm:text-base">
        <li>
          <Link href={HOME}>
            <a data-testid="home" className="text-gray-dark-2 hover:opacity-80">
              <Home className="w-4 h-4 sm:w-6 sm-h-6" />
            </a>
          </Link>
        </li>
        <li className="text-gray-dark-1 mx-2">/</li>
        {data.map(({ name, href }, index) => (
          <React.Fragment key={name}>
            {(index === lastIndex) ? (
              <li className="text-gray-dark-1">
                {name}
              </li>
            ): (
              <>
                <li>
                  <Link href={href}>
                    <a className="font-medium text-gray-dark-2 hover:opacity-80 ">{name}</a>
                  </Link>
                </li>
                <li className="text-gray-dark-1 mx-2">/</li>
              </>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs