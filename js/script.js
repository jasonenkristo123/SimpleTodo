let array1 = [1, 2, 3];
let array2 = [4, 5, 6];
array1.splice(4, 0, ...array2);
console.log(array1);