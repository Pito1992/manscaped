/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useIntl } from 'react-intl';
import { PRODUCT_THUMBNAIL } from '../../constants/product-thumbnail';
import type { IProductItem } from '../../types';

interface IProductTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  productList: IProductItem[];
  currency: string;
}

const ProductTable: React.FC<IProductTableProps> = ({ productList, currency }) => {
  const intl = useIntl();
  const totalPrice = productList.reduce((acc, { price }) => acc + +price * 100, 0) / 100;

  return (
    <table className="table table-fixed border-collapse w-full text-left text-sm sm:text-normal leading-normal">
      <thead>
        <tr className="font-bold uppercase tracking-[0.07em]">
          <th className="w-14 sm:w-[104px] py-1.5 sm:py-2.5">&nbsp;</th>
          <th className="py-1.5 sm:py-2.5">Product</th>
          <th className="text-center py-1.5 sm:py-2.5">Quality</th>
          <th className="text-right py-1.5 sm:py-2.5">Price</th>
        </tr>
      </thead>
      <tbody>
        {productList.map(({
          id, name, quantity, price, thumbnail
        }) => (
          <tr key={id} className="border-b border-solid border-gray">
            <td className="w-14 sm:w-[104px] py-1.5 sm:py-2.5">
              <div className="relative aspect-square w-12 h-12 sm:w-16 sm:h-16">
                <img
                  src={PRODUCT_THUMBNAIL[thumbnail as keyof typeof PRODUCT_THUMBNAIL]?.src}
                  alt={name}
                  className="absolute object-cover"
                />
              </div>
            </td>
            <td className="py-1.5 sm:py-2.5">{name}</td>
            <td className="text-center py-1.5 sm:py-2.5">{quantity}</td>
            <td className="text-right py-1.5 sm:py-2.5">
              {intl.formatNumber(+price, {
                style: "currency",
                currency
              })}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-b border-solid border-gray">
          <td className="py-3 sm:py-6 w-14 sm:w-[104px] font-bold">Total:</td>
          <td className="py-3 sm:py-6">&nbsp;</td>
          <td className="py-3 sm:py-6">&nbsp;</td>
          <td className="py-3 sm:py-6 text-right">
            {intl.formatNumber(+totalPrice.toFixed(2), {
              style: "currency",
              currency
            })}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ProductTable