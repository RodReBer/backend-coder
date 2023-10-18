import ProductManager from "../../src/classes/productManager.js";
const socket = io();
const PM = new ProductManager(path.join(__dirname, './data/products.json'));
// const userName = document.getElementById("userName");


Swal.fire({
    title: "Ingrese su Nombre",
    input: "text",
    inputAttributes: {
        autocapitalize: "on",
    },
    showCancelButton: false,
    confirmButtonText: "Ingresar",
}).then((result) => {
    // userName.innerHTML = result.value;
    socket.emit("userConection", { user: result.value });

});
socket.on('userConection', (data) => {
    console.log(data);
});

const botonesQuitar = document.querySelectorAll(".btnQuitar");
for (const boton of botonesQuitar) {
    boton.onclick = (e) => {
        e.preventDefault();
        PM.deleteProductById(boton.dataset.id);
    };
}