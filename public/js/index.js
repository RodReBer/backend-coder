const socket = io();

document.getElementById("btnAddProduct").addEventListener("click", (e) => {
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
      const price = document.getElementById("price").value;
      const thumbnail = document.getElementById("thumbnail").value;
      const code = document.getElementById("code").value;
      const stock = document.getElementById("stock").value;

      socket.emit("addProduct", {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    }
  });
});

socket.on("new-client", () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Usuario conectado'
  })
})

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
            >${product._id}</td>
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