export const convertPercToPosition = (value: number, referenceValue:number) => {
    const _value = (value * referenceValue) / 100;
    return parseInt(_value.toFixed(0));
};