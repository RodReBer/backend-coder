const socket = io();

const btnAddCart = document.getElementById("btnAddCartById");
const btnAddNewCart = document.getElementById("btnAddNewCart");

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

btnAddNewCart.addEventListener("click", (e) => {
  socket.emit("addCartNewCart");
});

btnAddCart.addEventListener("click", (e) => {
  Swal.fire({
    title: "Enter cart details",
    html:
      `<input required id="cartId" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Cart ID">` +
      `<input required id="productId" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Product ID">` +
      `<input required id="quantity" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Quantity">`,
    showCancelButton: true,
    confirmButtonText: "Add",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const cartId = document.getElementById("cartId").value;
      const productId = document.getElementById("productId").value;
      const quantity = document.getElementById("quantity").value;

      socket.emit("addCartById", {
        cartId,
        productId,
        quantity,
      });
    }
  });
});


socket.on("listCarts", (carts) => {
  try {
    const divCarts = document.getElementById("carts");
    divCarts.innerHTML = "";

    if (carts.length === 0) {
      // No hay carritos
      divCarts.innerHTML = `
        <div class="flex items-center justify-center h-4/5 w-full">
          <span class="text-4xl text-white">THERE ARE NO CARTS</span>
        </div>
      `;
      return;
    }

    carts.forEach((cart, cartIndex) => {
      const cartElement = document.createElement("div");

      cartElement.innerHTML += `<div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <h2 class="text-base font-semibold leading-6 text-white pl-2">Cart N°${cartIndex + 1} <span class="text-green-500"> ID: ${cart._id}</span> </h2>
       <table class="min-w-full divide-y divide-gray-300">
       <thead>
         <tr>
           <th
             scope="col"
             class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
           >Products</th>
           <th
             scope="col"
             class="hidden px-3 py-3.5 text-left text-sm font-semibold text-white lg:table-cell"
           >Id</th>
           <th
             scope="col"
             class="hidden px-3 py-3.5 text-left text-sm font-semibold text-white lg:table-cell"
           >Quantity</th>
           <th
             scope="col"
             class="hidden px-3 py-3.5 text-left text-sm font-semibold text-white lg:table-cell"
           >Code</th>
           <th
             scope="col"
             class="px-3 py-3.5 text-left text-sm font-semibold text-white"
           >Price</th>
           <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
           <div class="flex justify-end">
             <button
               type="button"
               data-cart-id="${cart._id}" 
               class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 btnDeleteCart hover:animate-pulse"
             >
               Delete Cart
               <span class="sr-only">${cart._id}</span>
             </button>
           </div>
         </th>
         
         </tr>
       </thead>  
       <tbody>
       ${cart.products.length > 0
          ? cart.products.map((product, productIndex) => `
          <tr>
            <td class="relative py-4 pl-4 pr-3 text-sm sm:pl-6 border-t border-transparent">
              <div class="font-medium text-white">${product.name}</div>
              <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                <span>${product.quantity}</span>
                <span class="hidden sm:inline">·</span>
                <span>${product.code}</span>
              </div>
              <div class="absolute -top-px left-6 right-0 h-px bg-gray-200"></div>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell border-t border-gray-200">
              ${product.productId}
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell border-t border-gray-200">
              ${product.quantity}
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell border-t border-gray-200">
              ${product.code}
            </td>
            <td class="px-3 py-3.5 text-sm text-gray-500 border-t border-gray-200">
              <div class="sm:hidden">
                ${product.price}
              </div>
              <div class="hidden sm:block">
                ${product.price}
              </div>
            </td>
            <td class="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                type="button"
                data-cart-id="${cart._id}" 
                data-id="${product.productId}"
                class="inline-flex items-center rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-red-500 hover:text-red-500 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white btnDeleteProductCart hover:animate-pulse "
              >Delete<span class="sr-only">${product.productId}</span></button>
            </td>
          </tr>
        `).join('')
          : `<tr><td colspan="6">
            <div class="flex items-center justify-center h-4/5 w-full">
              <span class="text-2xl text-white p-3">NO PRODUCTS IN THIS CART</span>
            </div>
          </td></tr>`
        }
      
         </tbody>
       </table>
     </div>`;
      divCarts.appendChild(cartElement);
    });

    const botonesQuitar = document.querySelectorAll(".btnDeleteProductCart");
    const botonesQuitarCart = document.querySelectorAll(".btnDeleteCart");

    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (e) => {
        e.preventDefault();
        const cartId = boton.dataset.cartId;
        const productId = boton.dataset.id;
        socket.emit("deleteProductOfTheCart", { cartId, productId });
      });
    }

    for (const boton of botonesQuitarCart) {
      boton.addEventListener("click", (e) => {
        e.preventDefault();
        const cartId = boton.dataset.cartId;
        console.log(cartId)
        socket.emit("deleteCart", { cartId });
      });
    }

  } catch (error) {
    console.error("Error processing listCarts:", error);
  }
});


