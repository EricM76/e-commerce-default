
import React from 'react';
import { CartItem as CartItemType } from '../types';
import TrashIcon from './icons/TrashIcon';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{item.name}</a>
            </h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="font-medium text-red-600 hover:text-red-500 flex items-center"
              aria-label={`Remove ${item.name} from cart`}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
