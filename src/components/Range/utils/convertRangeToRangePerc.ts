export const convertRangeToRangePerc = (range: number[])=>{
    let _range = [] as number[];
    const stepsPerc = 100 / (range.length - 1);
    range.forEach((__, index) => {
      if (index === 0) {
        _range.push(0);
      } else {
        _range.push(_range[_range.length - 1] + stepsPerc);
      }
    });
    return _range
}