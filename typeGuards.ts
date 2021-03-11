const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseAsString = (param: unknown | undefined): string => {
    if (!param || !isString(param)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Not a string: ' + param);
    }
    return param;
};