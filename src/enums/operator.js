// A l'aide de constante
/*
export const OP_ADD = '+';
export const OP_SUB = '-';
export const OP_MULTI = 'x';
export const OP_DIV = '/';

export default {
    OP_ADD,
    OP_SUB,
    OP_MULTI,
    OP_DIV
};
*/

// A l'aide d'un Map 'Figé'
const operationEnum = {
    ADD: '+',
    SUB: '-',
    MULTI: 'x',
    DIV: '/',
};

Object.freeze(operationEnum);

export default operationEnum;