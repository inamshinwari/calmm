import { ButtonType, CalcButton } from './types';

export const BUTTON_LAYOUT: CalcButton[][] = [
  [
    { label: 'AC', value: 'AC', type: ButtonType.ACTION, className: 'text-red-500 font-semibold' },
    { label: '⌫', value: 'DEL', type: ButtonType.ACTION, className: 'text-gray-600' },
    { label: '%', value: '%', type: ButtonType.OPERATOR, className: 'text-blue-500' },
    { label: '÷', value: '/', type: ButtonType.OPERATOR, className: 'text-blue-500 text-2xl pb-1' },
  ],
  [
    { label: '7', value: '7', type: ButtonType.NUMBER },
    { label: '8', value: '8', type: ButtonType.NUMBER },
    { label: '9', value: '9', type: ButtonType.NUMBER },
    { label: '×', value: '*', type: ButtonType.OPERATOR, className: 'text-blue-500 text-2xl pb-1' },
  ],
  [
    { label: '4', value: '4', type: ButtonType.NUMBER },
    { label: '5', value: '5', type: ButtonType.NUMBER },
    { label: '6', value: '6', type: ButtonType.NUMBER },
    { label: '−', value: '-', type: ButtonType.OPERATOR, className: 'text-blue-500 text-2xl pb-1' },
  ],
  [
    { label: '1', value: '1', type: ButtonType.NUMBER },
    { label: '2', value: '2', type: ButtonType.NUMBER },
    { label: '3', value: '3', type: ButtonType.NUMBER },
    { label: '+', value: '+', type: ButtonType.OPERATOR, className: 'text-blue-500 text-2xl pb-1' },
  ],
  [
    { label: '0', value: '0', type: ButtonType.NUMBER, className: 'col-span-2 w-full text-left pl-7' },
    { label: '.', value: '.', type: ButtonType.NUMBER },
    { label: '=', value: '=', type: ButtonType.ACTION, className: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-200' },
  ],
];
