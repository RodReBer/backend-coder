
const socket = io();

const btnAddProduct = document.getElementById("btnAddProduct");

const homeWeb = document.getElementById("homeLinkWeb");
const realTimeProductsWeb = document.getElementById("realTimeProductsLinkWeb");
const chatWeb = document.getElementById("chatLink");
const cartsWeb = document.getElementById("cartsLink");

const homeMobile = document.getElementById("homeLinkMobile");
const realTimeProductsMobile = document.getElementById("realTimeProductsLinkMobile");
const chatMobile = document.getElementById("chatLinkMobile");
const cartsMobile = document.getElementById("cartsLinkMobile");

switch (window.location.pathname.split("/")[1]) {
  case "":
    homeWeb.classList.add("bg-gray-900");
    homeMobile.classList.add("bg-gray-900");
    break;
  case "realtimeproducts":
    realTimeProductsWeb.classList.add("bg-gray-900");
    realTimeProductsMobile.classList.add("bg-gray-900");
    break;
  case "chat":
    chatWeb.classList.add("bg-gray-900");
    chatMobile.classList.add("bg-gray-900");
    break;
  case "carts":
    cartsWeb.classList.add("bg-gray-900");
    cartsMobile.classList.add("bg-gray-900");
    break;
}

if (btnAddProduct != null) {
  btnAddProduct.addEventListener("click", (e) => {
    Swal.fire({
      title: "Enter product details",
      html:
        `<input required id="title" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Title">` +
        `<input required id="description" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Description">` +
        `<input required id="price" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Price">` +
        `<input required id="thumbnail" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="URL image">` +
        `<input required id="code" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Code">` +
        `<input required id="stock" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Stock">`,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const thumbnail = document.getElementById("thumbnail").value;
        const code = document.getElementById("code").value;
        const stock = parseFloat(document.getElementById("stock").value);

        if (isNaN(price) || isNaN(stock)) {
          // Si el precio o el stock no son números, mostrar una alerta
          Swal.fire({
            icon: "error",
            title: "Invalid input",
            text: "Price and stock must be numeric values.",
          });
        } else {
          socket.emit("addProduct", {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          });
          window.location.reload();
        }
      }
    });
  });
}


// socket.on("new-client", () => {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer)
//       toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
//   })

//   Toast.fire({
//     icon: 'success',
//     title: 'Usuario conectado'
//   })
// })


const botonesQuitar = document.querySelectorAll(".btnDelete");

for (const boton of botonesQuitar) {
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("deleteProduct", boton.dataset.id);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  });

}


