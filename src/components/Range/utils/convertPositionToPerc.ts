export const convertPositionToPerc = (value: number, referenceValue: number) => {
    const _value = (value * 100) / referenceValue;
    return parseInt(_value.toFixed(0));
};