const incrementorProvider = (a: number) => (x: number) => x + a;

const incrementByOne = incrementorProvider(1);
console.log(incrementByOne(5));
