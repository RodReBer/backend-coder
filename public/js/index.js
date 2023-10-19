const socket = io();

// Swal.fire({
//   title: "Ingrese su Nombre",
//   input: "text",
//   inputAttributes: {
//     autocapitalize: "on",
//   },
//   showCancelButton: false,
//   confirmButtonText: "Ingresar",
// }).then((result) => {
//   // userName.innerHTML = result.value;
//   socket.emit("userConection", { user: result.value });
// });
// socket.on('userConection', (data) => {
//   console.log(data);
// });

socket.on("listProducts", (products) => {
  const divProducts = document.getElementById("products");
  divProducts.innerHTML = "";

  products.forEach(product => {
    const productElement = document.createElement("tr");
    divProducts.innerHTML += `
            <td
              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
            >${product.title}</td>
            <td
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
            >${product.id}</td>
            <td
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
            >${product.description}</td>
            <td
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
            >${product.price}</td>
            <td
              class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
            >
              <a
                href="#"
                data-id=${product.id}
                class="text-red-400 hover:text-red-300 btnDelete"
              >Delete<span class="sr-only">${product.id}</span></a>
            </td>
        `;
    divProducts.appendChild(productElement);
  });

  const botonesQuitar = document.querySelectorAll(".btnDelete");

  for (const boton of botonesQuitar) {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      socket.emit("deleteProduct", boton.dataset.id);
    });
  }
})