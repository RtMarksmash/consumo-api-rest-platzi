
let x = 10 

const p = new Promise((resolve , reject) =>{
    if(x == 10){
        resolve("la variable es igual a 10");
    }else{
        reject("la variable no es igual a 10");
    }
} );

p
.then(res =>{
    console.log("resolve: " + res)
})
.catch(error =>{
    console.log("error: " + error)
});




const promesa = new Promise((resolve, reject) => {
    setTimeout(() =>{
        x = x * 2 + 3;
        console.log("2.proceso terminado");
        resolve(x);
    },2000); 

    });

    console.log("1. proceso inicializado")

    promesa.then(res => {
        console.log("3. la respuesta es: " + res )
    });


    let usuarios = [{
        id: 1,
        nombre: "jorge"
    },
    {
        id: 2,
        nombre: "mario"

}];

let telefonos = [{
    id: 1,
    telefono: 3276387687,
},
{
    id: 2,
    telefono: 675675228,
}];

const obtenerUsuario = (id) =>{
    return new Promise((resolve, reject)=>{
        if(usuarios.find(usuario => usuario.id === id)){

            console.log("el usuario existe");
            resolve(obtenerTelefono(id));

        }else {
            reject("el usuario no existe")
        };
    })

};

const obtenerTelefono = (id) =>{
    return new Promise((resolve, reject)=>{
        if(telefonos.find(telefono => telefono.id === id)){
            resolve("el telefono existe");
        }else{
            reject("el telefono no existe")
        };
    })

};

obtenerUsuario(1)
.then(res => {
    return res
})
.then(mensaje =>{
    console.log(mensaje)
})
.catch(error =>{
    console.log(error)
})