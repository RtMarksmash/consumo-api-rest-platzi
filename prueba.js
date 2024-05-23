
const prueba = [2,6,3,5]

let index = 0;

function* showPhoto(){

yield prueba[index]
yield prueba[index] = prueba[index + 1]

}


const photo = showPhoto();

console.log(photo.next().value);
console.log(photo.next().value);
console.log(photo.next().value);







