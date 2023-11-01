const socket = io();

const userName = document.querySelector(".userName") || "";
const userImage = document.querySelector(".userImage") || "";
const chatMessage = document.querySelector(".chatMessage") || "";

const inputMsg = document.getElementById("comment") || "";
const buttonComment = document.getElementById("buttonComment") || "";

Swal.fire({
    title: "Enter product details",
    html:
        `<input required id="name" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Name">` +
        `<input required id="imageurl" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Image Url">` +
        `<input required id="email" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Email">`,
    showCancelButton: true,
    inputAttributes: {
        autocapitalize: 'on'
    },
    confirmButtonText: "Enter",
    cancelButtonText: "Cancel",
}).then((result) => {
    if (result.isConfirmed) {
        const name = document.getElementById("name").value;
        const image = document.getElementById("imageurl").value;
        const email = document.getElementById("email").value;
        userName.innerHTML = name;
        userImage.src = image;
        socket.emit("new-user", {
            name,
            image,
            email
        });
        buttonComment.addEventListener("click", (e) => {
            e.preventDefault();
            socket.emit("user-message", {
                message: inputMsg.value, name, image, email
            });
        });
    }
});

socket.on("listMessages", (data) => {
    if (data[0] != undefined) {
        chatMessage.innerHTML += `<li class="relative flex gap-x-4">
        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
        <div class="w-px bg-gray-200"></div>
        </div>
        <img
          src="${data[0].img}"
          alt=""
          class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50 userImage"
        />
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-500"><span
                class="font-medium text-white userName"
              >${data[0].name}</span>
              commented</div>
            <time
              datetime="2023-01-23T15:56"
              class="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >${data[0].date}</time>
          </div>
          <p class="text-sm leading-6 text-gray-500">${data[0].message}.</p>
        </div>
      </li>`;

        data.slice(1).forEach((user) => {
            chatMessage.innerHTML += `<li class="relative flex gap-x-4">
        <div class="absolute left-0 -top-6 flex w-6 justify-center bottom-0">
        <div class="w-px bg-gray-200"></div>
        </div>
        <img
          src="${user.img}"
          alt=""
          class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50 userImage"
        />
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-500"><span
                class="font-medium text-white userName"
              >${user.name}</span>
              commented</div>
            <time
              datetime="2023-01-23T15:56"
              class="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >${user.date}</time>
          </div>
          <p class="text-sm leading-6 text-gray-500">${user.message}.</p>
        </div>
      </li>`;
        });
    }

});

socket.on("new-user", (data) => {
    const user = data[data.length - 1];

    if (data.length == 1) {
        chatMessage.innerHTML += `

    <li class="relative flex gap-x-4">

  </div>
        <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-900"
    >
      <div
        class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
      ></div>
    </div>
    <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span
        class="font-medium text-white"
      >${user.name}</span>
      Se ha Conectado</p>
    <time
      datetime="2023-01-24T09:12"
      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
    >${user.date}</time>
  </li>`;
    } else {
        chatMessage.innerHTML += `

    <li class="relative flex gap-x-4">
    <div class="absolute left-0 -top-6 flex w-6 justify-center bottom-0">
    <div class="w-px bg-gray-200"></div>
  </div>
        <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-900"
    >
      <div
        class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
      ></div>
    </div>
    <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span
        class="font-medium text-white"
      >${user.name}</span>
      Se ha Conectado</p>
    <time
      datetime="2023-01-24T09:12"
      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
    >${user.date}</time>
  </li>`;
    }

});

socket.on("personal-conection", (data) => {
    const user = data[data.length - 1];


    chatMessage.innerHTML += `

    <li class="relative flex gap-x-4">
    <div class="absolute left-0 -top-6 flex w-6 justify-center bottom-0">
    <div class="w-px bg-gray-200"></div>
  </div>
        <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-900"
    >
      <div
        class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
      ></div>
    </div>
    <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span
        class="font-medium text-white"
      >${user.name}</span>
      te haz conectado</p>
    <time
      datetime="2023-01-24T09:12"
      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
    >${user.date}</time>
  </li>`;

});

socket.on("first-new-user", (data) => {

    chatMessage.innerHTML += `
    <li class="relative flex gap-x-4">

  </div>
        <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-900"
    >
      <div
        class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
      ></div>
    </div>
    <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span
        class="font-medium text-white"
      >${data.name}</span>
      Se ha Conectado</p>
    <time
      datetime="2023-01-24T09:12"
      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
    >${data.date}</time>
  </li>`;

});

socket.on("first-personal-conection", (data) => {

    chatMessage.innerHTML += `

    <li class="relative flex gap-x-4">

  </div>
        <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-900"
    >
      <div
        class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
      ></div>
    </div>
    <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500"><span
        class="font-medium text-white"
      >${data.name}</span>
      Te haz conectado</p>
    <time
      datetime="2023-01-24T09:12"
      class="flex-none py-0.5 text-xs leading-5 text-gray-500"
    >${data.date}</time>
  </li>`;

});

socket.on("user-message", (data) => {

    if (data.length > 0) {
        const user = data[data.length - 1];

        chatMessage.innerHTML += `
        <li class="relative flex gap-x-4">
        <div class="absolute left-0 -top-6 flex w-6 justify-center bottom-0">
        <div class="w-px bg-gray-200"></div>
        </div>
        <img
          src="${user.img}"
          alt=""
          class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50 userImage"
        />
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-500"><span
                class="font-medium text-white userName"
              >${user.name}</span>
              commented</div>
            <time
              datetime="2023-01-23T15:56"
              class="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >${user.date}</time>
          </div>
          <p class="text-sm leading-6 text-gray-500">${user.message}.</p>
        </div>
      </li>`;

    }



});
