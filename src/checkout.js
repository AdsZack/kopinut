const cart = [];

let checkoutList;
let subtotalElement;
let taxElement;
let totalElement;
let clearButton;

function formatRupiah(amount) {
    return `Rp${amount.toLocaleString("id-ID")}`;
}

// fungsi addToCheckout
export function addToCheckout(menu, selectedSize) {
    const existingItem = cart.find(item =>
        item.menuId === menu.id &&
        item.sizeName === selectedSize.name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            menuId: menu.id,
            name: menu.name,
            image: menu.image,
            sizeName: selectedSize.name,
            price: selectedSize.price,
            quantity: 1,
        });
    }
    renderCheckout();
}

// fungsi renderCheckout
function renderCheckout() {
    checkoutList.innerHTML = "";
    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-2";
        row.innerHTML = `
            <div class="flex min-w-0 items-center gap-2">
                <img src="${item.image}" alt="${item.name}" class="rounded-md w-10 h-10 object-cover">
                <div class="min-w-0">
                    <h4 class="font-semibold text-sm">
                        ${item.name}
                    </h4>
                    <p class="text-xs text-gray-600">${item.sizeName}</p>
                    <p class="text-xs">${formatRupiah(item.price)}</p>
                </div>
            </div>
            <div class="flex shrink-0 items-center gap-2">
                <button 
                    type="button"
                    class="rounded-full w-6 h-6 border"
                    data-action="decrease"
                    data-index="${index}"
                >-</button>
                <span class="text-sm font-bold">
                    ${item.quantity}
                </span>
                <button 
                    type="button"
                    class="rounded-full w-6 h-6 border"
                    data-action="increase"
                    data-index="${index}"
                >+</button>
            </div>
        `;

        checkoutList.appendChild(row);
    });

    const subTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const tax = 0;
    const total = subTotal + tax;

    subtotalElement.textContent = formatRupiah(subTotal);
    taxElement.textContent = formatRupiah(tax);
    totalElement.textContent = formatRupiah(total);
}

// fungsi initCheckout
export function initCheckout() {
    checkoutList = document.getElementById("checkout-list");
    subtotalElement = document.getElementById("subtotal-value");
    taxElement = document.getElementById("tax-value");
    totalElement = document.getElementById("total-value");
    clearButton = document.getElementById("clear-checkout");

    if (
        !checkoutList ||
        !subtotalElement ||
        !taxElement ||
        !totalElement ||
        !clearButton
    ) {
        console.error("Elemen checkout tidak ditemukan. Periksa ID HTML.");
        return;
    }

    checkoutList.addEventListener("click",  event => {
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const index = Number(button.dataset.index);
        const item = cart[index];

        if (!item) return;

        if (button.dataset.action === "increase") {
            item.quantity++;
        } else if (button.dataset.action === "decrease") {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.splice(index, 1);
            }
        }

        renderCheckout();
    });

    clearButton.addEventListener("click", () => {
        cart.length = 0;
        renderCheckout();
    });

    renderCheckout();
}