import React from 'react';
import { useIntl } from 'react-intl';
import NextImage from 'next/image';
import OrderContext, { IOrderContext } from "contexts/Order";
import { PRODUCT_THUMBNAIL } from 'constants/product-thumbnail';

interface IProductTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  isEditable?: boolean;
}

const ProductTable: React.FC<IProductTableProps> = ({ isEditable }) => {
  const intl = useIntl();
  const { order, setOrder } = React.useContext<IOrderContext>(OrderContext);
  const { productList = [], currency, productSelected = [] } = order;
  const [isCheckAll, checkAll] = React.useState<boolean>(false);
  const [isCheck, check] = React.useState<boolean[]>(productList.map(() => false));
  const totalPrice = productList.reduce((acc, { price, quantity }, i) => {
    if (!productSelected[i]) return acc;
    return acc + (+price * 100) * quantity;
  }, 0) / 100;

  const onIncreaseQuantity = (index: number) => () => {
    const currentQuantity = productList[index].quantity;
    onUpdateProductQuantity(index, currentQuantity + 1)
  }

  const onRemoveProduct = (index: number) => {
    if (confirm("Are you sure to remove this product?")) {
      setOrder({
        ...order,
        productList: productList.filter((_, i) => index !== i),
        isDirty: true
      });
    }
  }

  const onDecreaseQuantity = (index: number) => () => {
    const currentQuantity = productList[index].quantity;
    if (currentQuantity > 1) {
      onUpdateProductQuantity(index, currentQuantity - 1)
    } else {
      onRemoveProduct(index);
    }
  }

  const onChangeQuantity = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) && +value > 0) {
      onUpdateProductQuantity(index, +value);
    }
  }

  const onUpdateProductQuantity = (index: number, value: number) => {
    const newProducts = [...productList];
    newProducts[index].quantity = value
    setOrder({
      ...order,
      productList: newProducts,
      isDirty: true
    });
  }

  const onToggleAllCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkAll(e.target.checked);
    check(productList.map(() => e.target.checked));
  }

  const onToggleCheckbox = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    check((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.checked;
      checkAll(newState.every(Boolean));
      return newState;
    });
  }

  React.useEffect(() => {
    isEditable && setOrder((prevOrder) => ({
      ...prevOrder,
      productSelected: isCheck
    }));
  }, [isCheck, isEditable, setOrder])

  return (
    <table className="table table-fixed border-collapse w-full text-left text-xs sm:text-base leading-normal">
      <thead>
        <tr className="font-bold uppercase tracking-[0.07em]">
          {isEditable && (
            <th className="w-5 py-1.5 sm:py-2.5">
              <span className='flex items-center'>
                <input
                  data-testid="product-select-all"
                  type="checkbox"
                  defaultChecked={isCheckAll}
                  onChange={onToggleAllCheckboxes}
                  className="cursor-pointer"
                />
              </span>
            </th>
          )}
          <th className="w-14 sm:w-[104px] py-1.5 sm:py-2.5">&nbsp;</th>
          <th className="py-1.5 sm:py-2.5">Product</th>
          <th className="text-center py-1.5 sm:py-2.5">Quantity</th>
          <th className="text-right py-1.5 sm:py-2.5">Price</th>
        </tr>
      </thead>
      <tbody>
        {productList
          .filter((_, i) => {
            if (!isEditable) return productSelected[i];
            return true;
          })
          .map(({
            id, name, quantity, price, thumbnail
          }, index) => (
            <tr data-testid="product-item" key={id} className="border-b border-solid border-gray">
              {isEditable && (
                <td className="w-5 py-1.5 sm:py-2.5">
                  <span className='flex items-center'>
                    <input
                      data-testid="product-select"
                      type="checkbox"
                      defaultChecked={isCheck[index]}
                      onChange={onToggleCheckbox(index)}
                      className="cursor-pointer"
                    />
                  </span>
                </td>
              )}
              <td className="w-14 sm:w-[104px] py-1.5 sm:py-2.5">
                <div className="relative aspect-square w-10 h-10 sm:w-16 sm:h-16">
                  <NextImage
                    layout="fill"
                    objectFit="contain"
                    src={PRODUCT_THUMBNAIL[thumbnail as keyof typeof PRODUCT_THUMBNAIL]}
                    alt={name}
                  />
                </div>
              </td>
              <td className="py-1.5 sm:py-2.5">{name}</td>
              <td data-testid="product-item-quality" className="text-center py-1.5 sm:py-2.5">
                {isEditable ? (
                  <span className="flex items-center justify-center">
                    <button data-testid="product-item-quality-decrease" className="bg-gray flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6" onClick={onDecreaseQuantity(index)}>-</button>
                    <input data-testid="product-item-quality-input" type="text" className="inline-block w-8 sm:w-12 h-6 text-center rounded-none bg-white focus:outline-none" value={quantity} onChange={onChangeQuantity(index)} />
                    <button data-testid="product-item-quality-increase" className="bg-gray flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6" onClick={onIncreaseQuantity(index)}>+</button>
                  </span>
                ) : quantity}
              </td>
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
          {isEditable && (
            <td className="w-5 py-1.5 sm:py-2.5">
              &nbsp;
            </td>
          )}
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