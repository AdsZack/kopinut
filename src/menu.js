export function createMenuCard(menu, onAddToCheckout) {
  const card = document.createElement("div");
  card.className =
    "relative flex flex-col min-w-0 gap-3 rounded-lg p-3 shadow-lg";
  const startingPrice = Math.min(...menu.sizes.map((size) => size.price));
  card.innerHTML = `
        <img 
            src="${menu.image}"
            alt="${menu.name}"
            class="w-full aspect-4/3 rounded-lg object-cover"
        >
        <button 
            type="button"
            class="add-to-cart absolute top-1 right-1 z-10 w-8 h-8
                rounded-full bg-black border shadow-lg font-bold text-lg text-white
                items-center justify-center"
            aria-label="Tambah ${menu.name}"
            hidden
        >
            +
        </button>
        <div class="flex items-start justify-between gap-2">
            <h3 class="min-w-0 text-base font-semibold">${menu.name}</h3>
            <p class="menu-price shrink-0 text-sm font-bold">
                Rp${startingPrice.toLocaleString("id-ID")}
            </p>
        </div>
        ${createMilkOption()}
        ${createSizeOptions(menu.sizes)}
        
    `;

  const priceElement = card.querySelector(".menu-price");
  const sizeButtons = card.querySelectorAll(".size-option");
  const addButton = card.querySelector(".add-to-cart");

  let selectedSize = null;

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.sizeIndex);
      selectedSize = menu.sizes[index];

      priceElement.textContent = `Rp${selectedSize.price.toLocaleString("id-ID")}`;

      addButton.hidden = false;
      addButton.style.display = "flex";

      sizeButtons.forEach((sizeButtons) => {
        sizeButtons.classList.remove(
          "bg-gray-100",
          "ring-1",
          "ring-gray-500",
        );
      });

      button.classList.add("bg-gray-100", "ring-1", "ring-gray-500");
    });
  });

  addButton.addEventListener("click", () => {
    if (!selectedSize) return;
    onAddToCheckout(menu, selectedSize);
  });

  return card;
}

function createMilkOption() {
  return `
        <div class="flex items-center min-w-0 h-auto p-1 justify-between shadow-md">
            <p class="text-sm text-gray-500">Add plant milk</p>
            <button class="rounded-full p-1 bg-gray-300 font-bold shadow-md w-6 h-6 items-center justify-center flex">
                +
            </button>
        </div>
    `;
}

function createSizeOptions(sizes = []) {
  return `
        <div class="flex justify-around gap-2">
            ${sizes
              .map(
                (size, index) => `
                <button 
                    type="button" 
                    class="size-option flex flex-col items-center gap-1 rounded-md p-1"
                    data-size-index="${index}"
                    >
                    <img src="src/assets/icons/cup-size.svg" alt="" class="h-6 w-6">
                    <span class="text-xs">${size.name}</span>
                </button>
            `,
              )
              .join("")}
        </div>
    `;
}

export function renderMenus(menuList, menus, onAddToCheckout) {
  menuList.innerHTML = "";
  menus.forEach((menu) => {
    const card = createMenuCard(menu, onAddToCheckout);
    menuList.appendChild(card);
  });
}
