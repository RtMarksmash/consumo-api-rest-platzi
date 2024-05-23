const api = axios.create({
    baseUrl: "https://api.thecatapi.com/v1/images"   
});
api.defaults.headers.common["X-API-KEY"] = "3c96d47b-b8b8-4866-af10-a3e5814ee3a0" 

const URL_API_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const URL_API_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const URL_API_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=3c96d47b-b8b8-4866-af10-a3e5814ee3a0`;
const URL_API_UPLOAD = "https://api.thecatapi.com/v1/images/upload"

const spanError = document.getElementById("errorMichis")


async function loadRandom() {

const res = await fetch(URL_API_RANDOM,{
    method: "GET",
    headers: {
        "X-API-KEY": "3c96d47b-b8b8-4866-af10-a3e5814ee3a0"
    }
});// donde se captura la url del api
const data = await res.json()// se transforma a un lenguaje que el navegador entienda


if(res.status !== 200 ){
    spanError.innerHTML = "hubo un error: " + res.status + data.message;
    
}else{
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    img1.src = data[0].url;
    img2.src = data[1].url;

    const button1 = document.getElementById("button1");
    button1.onclick = () => savefavouriteMichi(data[0].id);

    const button2 = document.getElementById("button2");
    button2.onclick = () => savefavouriteMichi(data[1].id);
    
   

};








console.log("random");
console.log(data);

       
};

async function loadFavorites() {

const res = await fetch(URL_API_FAVORITES,{
    method: "GET",
    headers: {
        "X-API-KEY": "3c96d47b-b8b8-4866-af10-a3e5814ee3a0"
    },
});// donde se captura la url del api
const data = await res.json();// se transforma a un lenguaje que el navegador entienda

console.log("favoritos");
console.log(data);

if(res.status !== 200 ){
    spanError.innerHTML = "hubo un error: " + res.status + data.message;
    
}else{
    const section = document.getElementById("favouritesMichis");
    const h2 = document.createElement("h2");
    const textH2 = document.createTextNode("michis favoritos");
    h2.appendChild(textH2);
    section.appendChild(h2);

    data.forEach(Michi => {
        
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode("sacar de michis favoritos");


        img.src = Michi.image.url
        btn.appendChild(btnText);
        btn.onclick = () => deletefavouriteMichi(Michi.id)
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
        
    });
    

        
    };
     
    
        

    
       
};


const button = document.getElementById("button");
button.addEventListener("click", loadRandom);

loadRandom();
loadFavorites();



async function savefavouriteMichi(id){

    const {data, status} = await api.post("/favourites",{
        image_id: id
    });
    /* const res = await fetch(URL_API_FAVORITES ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "3c96d47b-b8b8-4866-af10-a3e5814ee3a0"
        },
        body: JSON.stringify({
            "image_id": id
        }),    
    });

    const data = await res.json(); */


    if(status !== 200 ){
        spanError.innerHTML = "hubo un error: " + status + data.message;
    }else {
        console.log("el michi ha sido guradado");
        
    } 
        

    console.log("save");
    console.log(data);
}


/* fetch(url)
.then(res => res.json())
.then(data =>{
    const img = document.querySelector("img");
    img.src = data[0].url
})
 */

async function deletefavouriteMichi(id){
    const res = await fetch(URL_API_FAVORITES_DELETE(id) ,{
        method: "DELETE",
          
    });

    const data = await res.json();


    if(res.status !== 200 ){
        spanError.innerHTML = "hubo un error: " + res.status + data.message;
    }else {
        console.log("el michi ha sido eliminado");
        
    }
        

    console.log("delete");
    console.log(data);
}

async function uploadingMichiPhoto(){
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const res =  await fetch(URL_API_UPLOAD,{
        method: "POST",
        headers: {
            //"Content-Type": "FormData",
            "X-API-KEY": "3c96d47b-b8b8-4866-af10-a3e5814ee3a0"
        },
        body: formData
        
    });

    const data = await res.json();

    if(res.status !== 200 ){
        spanError.innerHTML = "hubo un error: " + res.status + data.message;
    }else {
        console.log("el michi ha sido subido ");
        
    }
    
   
    console.log("subir");
    console.log(data);


};

const buttonUp = document.getElementById("buttonUp");
buttonUp.onclick = () => uploadingMichiPhoto();

