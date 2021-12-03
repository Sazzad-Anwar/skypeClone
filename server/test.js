let images = []

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const promiseA = new Promise((resolve, reject) => {
    for (let i in numbers) {
        images.push(i)
    }
    resolve(images);
});
// At this point, "promiseA" is already settled.
promiseA.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777
