const socket = io();
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