export const closestIndexArray = (number: number, array: number[]) => {
    var curr = array[0],
      diff = Math.abs(number - curr),
      index = 0;

    for (var val = 0; val < array.length; val++) {
      let newdiff = Math.abs(number - array[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = array[val];
        index = val;
      }
    }
    return index;
};