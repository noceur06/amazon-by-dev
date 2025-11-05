
const products = [
  {
    id: "jbl1",
    name: "JBL Headphones (On-ear) - JBL",
    img: "jbl.jpg",
    price: 3499,
    category: "headphones",
  },
  {
    id: "beats1",
    name: "Generic Headphones - Black",
    img: "headphones.jpg",
    price: 1299,
    category: "headphones",
  },
  {
    id: "soundbox1",
    name: "Sound Box Speaker",
    img: "sound-box.jpg",
    price: 899,
    category: "headphones",
  },
  {
    id: "sound1",
    name: "Portable Speaker",
    img: "sound.jpg",
    price: 1599,
    category: "headphones",
  },

  {
    id: "iphone15",
    name: "Apple iPhone 15 (128 GB)",
    img: "phone.jpg",
    price: 51990,
    category: "phones",
  },
  {
    id: "galaxy1",
    name: "Samsung Galaxy (A-series)",
    img: "galaxy.jpg",
    price: 14999,
    category: "phones",
  },
  {
    id: "smartwatch1",
    name: "Smartwatch",
    img: "smartwatch.jpg",
    price: 2499,
    category: "phones",
  },
  {
    id: "pendrive1",
    name: "Pendrive 32GB",
    img: "pendrive.jpg",
    price: 599,
    category: "phones",
  },

  {
    id: "torch1",
    name: "LED Torch",
    img: "torch.jpg",
    price: 399,
    category: "home",
  },
  {
    id: "umbrella1",
    name: "Travel Umbrella",
    img: "umbrella.jpg",
    price: 599,
    category: "home",
  },
  {
    id: "table-stand1",
    name: "Table Stand",
    img: "table-stand.jpg",
    price: 899,
    category: "home",
  },
  {
    id: "printing1",
    name: "Printer Cartridge / Accessories",
    img: "printing.jpg",
    price: 799,
    category: "home",
  },

  {
    id: "monitor1",
    name: 'Monitor 24"',
    img: "monitor.jpg",
    price: 10499,
    category: "computer",
  },
  {
    id: "mic1",
    name: "USB Microphone",
    img: "mic.jpg",
    price: 1999,
    category: "computer",
  },
  {
    id: "keyboard1",
    name: "Mechanical Keyboard",
    img: "keyboard.jpg",
    price: 2499,
    category: "computer",
  },
  {
    id: "soundcard1",
    name: "Sound Accessory",
    img: "sound.jpg",
    price: 699,
    category: "computer",
  },

  {
    id: "knife1",
    name: "Kitchen Knife",
    img: "knife.jpg",
    price: 599,
    category: "kitchen",
  },
  {
    id: "press1",
    name: "Kitchen Press",
    img: "press.jpg",
    price: 799,
    category: "kitchen",
  },
  {
    id: "torch2",
    name: "Multi-tool",
    img: "knife.jpg",
    price: 449,
    category: "kitchen",
  },
  {
    id: "sound2",
    name: "Small Kitchen Gadget",
    img: "sound.jpg",
    price: 499,
    category: "kitchen",
  },

  {
    id: "jbl2",
    name: "JBL Headphones (Other)",
    img: "jbl.jpg",
    price: 3299,
    category: "deals",
  },
  {
    id: "phone2",
    name: "Budget Phone",
    img: "phone.jpg",
    price: 7999,
    category: "deals",
  },
  {
    id: "pendrive2",
    name: "16GB Pendrive",
    img: "pendrive.jpg",
    price: 399,
    category: "deals",
  },
  {
    id: "sound3",
    name: "Bluetooth Speaker",
    img: "sound-box.jpg",
    price: 1299,
    category: "deals",
  },
];


function ensureRatings() {
  const key = "prod_ratings_v1";
  let map = {};
  try {
    map = JSON.parse(sessionStorage.getItem(key) || "{}");
  } catch (e) {
    map = {};
  }
  products.forEach((p) => {
    if (map[p.id]) {
      p.rating = map[p.id].rating;
      p.reviews = map[p.id].reviews;
    } else {
      const r = randomRating();
      p.rating = r.rating;
      p.reviews = r.reviews;
      map[p.id] = { rating: p.rating, reviews: p.reviews };
    }
  });
  sessionStorage.setItem(key, JSON.stringify(map));
}
function randomRating() {
  const rating = Math.floor(Math.random() * 4) + 2; 
  const reviews = Math.floor(Math.random() * (15000 - 100 + 1)) + 100;
  return { rating, reviews };
}


const boxIds = {
  headphones: document.getElementById("box-headphones"),
  phones: document.getElementById("box-phones"),
  home: document.getElementById("box-home"),
  computer: document.getElementById("box-computer"),
  kitchen: document.getElementById("box-kitchen"),
  deals: document.getElementById("box-deals"),
};
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const ordersBtn = document.getElementById("ordersBtn");
const ordersModal = document.getElementById("ordersModal");
const closeOrders = document.getElementById("closeOrders");
const ordersContainer = document.getElementById("ordersContainer");
const toast = document.getElementById("toast");



let cart = loadCart();
function loadCart() {
  try {
    const raw = localStorage.getItem("my_amazon_cart_v1");
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
function saveCartLocal() {
  localStorage.setItem("my_amazon_cart_v1", JSON.stringify(cart));
  updateCartCount();
}


function loadOrders() {
  try {
    const raw = localStorage.getItem("my_amazon_orders_v1");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveOrders(orders) {
  localStorage.setItem("my_amazon_orders_v1", JSON.stringify(orders));
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
}
function showToast(msg, time = 2000) {
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), time);
}


function populateBoxes() {
  Object.keys(boxIds).forEach((category) => {
    const container = boxIds[category];
    container.innerHTML = "";
    const items = products.filter((p) => p.category === category).slice(0, 4);
    items.forEach((it) => {
      const card = document.createElement("div");
      card.className = "box-card";
      card.innerHTML = `
        <img src="${it.img}" alt="${escapeHtml(it.name)}">
        <div class="bname">${escapeHtml(it.name)}</div>
        <div class="bprice">₹${numberWithCommas(it.price)}</div>
      `;
      container.appendChild(card);
    });
  });
}


function renderProducts(list) {
  productsGrid.innerHTML = "";
  const seen = new Set();
  list.forEach((p) => {
    if (seen.has(p.id)) return;
    seen.add(p.id);
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="thumb"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
      <div class="title">${escapeHtml(p.name)}</div>
      <div class="rating">${renderStars(
        p.rating
      )} <span class="meta">(${numberWithCommas(
      p.reviews
    )} ratings)</span></div>
      <div class="meta">in ${Math.floor(Math.random() * 5000) + 50}+ carts</div>
      <div class="price-row">
        <div><div class="price">₹${numberWithCommas(p.price)}</div></div>
        <div>
          <select class="qty-select" aria-label="Quantity">
            ${[...Array(9)]
              .map((_, i) => `<option value="${i + 1}">${i + 1}</option>`)
              .join("")}
          </select>
        </div>
      </div>
      <div style="margin-top:auto;">
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}
function renderStars(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++)
    out += `<span class="star ${i <= rating ? "filled" : ""}">&#9733;</span>`;
  return out;
}


function doSearch() {
  const q = (searchInput.value || "").trim().toLowerCase();
  if (!q) {
    renderProducts(products);
    return;
  }
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q));
  renderProducts(filtered);
}


function updateCartCount() {
  const count = Object.values(cart).reduce((s, it) => s + it.qty, 0);
  cartCountEl.textContent = count;
}
function addToCart(id, qty = 1) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  if (!cart[id]) cart[id] = { ...p, qty: 0 };
  cart[id].qty += qty;
 
  if (cart[id].qty > 99) cart[id].qty = 99;
  saveCartLocal();
  showToast("Added to cart");
}
function removeFromCart(id) {
  delete cart[id];
  saveCartLocal();
}
function changeQty(id, qty) {
  if (!cart[id]) return;
  cart[id].qty = qty;
  if (cart[id].qty <= 0) removeFromCart(id);
  saveCartLocal();
}


function renderCartModal() {
  cartItemsContainer.innerHTML = "";
  const ids = Object.keys(cart);
  if (!ids.length) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  ids.forEach((id) => {
    const it = cart[id];
    const node = document.createElement("div");
    node.className = "cart-item";
    node.innerHTML = `
      <img src="${it.img}" alt="${escapeHtml(it.name)}">
      <div class="meta" style="flex:1">
        <div class="title">${escapeHtml(it.name)}</div>
        <div>₹${numberWithCommas(it.price)} x ${it.qty} = ₹${numberWithCommas(
      it.price * it.qty
    )}</div>
        <div style="margin-top:0.5rem;">
          <button class="btn small dec" data-id="${id}">-</button>
          <span style="padding:0 0.5rem">${it.qty}</span>
          <button class="btn small inc" data-id="${id}">+</button>
          <button class="btn small remove" data-id="${id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(node);
  });


  cartItemsContainer.querySelectorAll(".inc").forEach((b) =>
    b.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      changeQty(id, cart[id].qty + 1);
      renderCartModal();
    })
  );
  cartItemsContainer.querySelectorAll(".dec").forEach((b) =>
    b.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      changeQty(id, cart[id].qty - 1);
      renderCartModal();
    })
  );
  cartItemsContainer.querySelectorAll(".remove").forEach((b) =>
    b.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFromCart(id);
      renderCartModal();
    })
  );
}


checkoutBtn &&
  checkoutBtn.addEventListener("click", () => {
    const ids = Object.keys(cart);
    if (!ids.length) {
      showToast("Cart is empty");
      return;
    }
    const orders = loadOrders();
    const order = {
      id: "order_" + Date.now(),
      createdAt: new Date().toISOString(),
      items: Object.values(cart).map((it) => ({
        id: it.id,
        name: it.name,
        img: it.img,
        price: it.price,
        qty: it.qty,
      })),
      total: Object.values(cart).reduce((s, it) => s + it.price * it.qty, 0),
    };
    orders.unshift(order);
    saveOrders(orders);
    cart = {};
    saveCartLocal();
    renderCartModal();
    cartModal.classList.add("hidden");
    showToast("Order placed");
  });


function renderOrdersModal() {
  ordersContainer.innerHTML = "";
  const orders = loadOrders();
  if (!orders.length) {
    ordersContainer.innerHTML = "<p>No orders yet.</p>";
    return;
  }
  orders.forEach((order) => {
    const node = document.createElement("div");
    node.className = "cart-item";
    node.style.flexDirection = "column";
    node.style.alignItems = "stretch";
    node.style.gap = "0.5rem";
    node.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><strong>Order ID:</strong> ${order.id} <br><small>${new Date(
      order.createdAt
    ).toLocaleString()}</small></div>
        <div><strong>Total:</strong> ₹${numberWithCommas(order.total)}</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        ${order.items
          .map(
            (it, idx) => `
          <div style="display:flex;gap:0.5rem;align-items:center;border:1px solid #f0f0f0;padding:0.4rem;border-radius:0.375rem;">
            <img src="${
              it.img
            }" style="width:4rem;height:3rem;object-fit:contain;">
            <div style="min-width:9rem;">
              <div style="font-weight:700">${escapeHtml(it.name)}</div>
              <div>₹${numberWithCommas(it.price)} x ${it.qty}</div>
            </div>
            <div style="margin-left:auto;">
              <button class="btn return-item" data-order="${
                order.id
              }" data-index="${idx}">Return</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    ordersContainer.appendChild(node);
  });


  ordersContainer.querySelectorAll(".return-item").forEach((b) => {
    b.addEventListener("click", (e) => {
      const orderId = e.target.dataset.order;
      const idx = Number(e.target.dataset.index);
      handleReturn(orderId, idx);
    });
  });
}

function handleReturn(orderId, index) {
  const orders = loadOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    showToast("Order not found");
    return;
  }
  const item = order.items[index];
  if (!item) {
    showToast("Item not found");
    return;
  }
 
  order.items.splice(index, 1);
  if (order.items.length === 0) {
    const pos = orders.findIndex((o) => o.id === orderId);
    if (pos !== -1) orders.splice(pos, 1);
  }
  saveOrders(orders);
  renderOrdersModal();
  showToast(`Returned ${item.name}`);
}


document.addEventListener("click", (e) => {
  
  if (e.target.matches(".add-to-cart")) {
    const id = e.target.dataset.id;
    const card = e.target.closest(".card");
    const qty = Number(card.querySelector(".qty-select")?.value || 1);
    addToCart(id, qty);
  }
});


searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});


cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  renderCartModal();
});
closeCart &&
  closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });
ordersBtn.addEventListener("click", () => {
  ordersModal.classList.remove("hidden");
  renderOrdersModal();
});
closeOrders &&
  closeOrders.addEventListener("click", () => {
    ordersModal.classList.add("hidden");
  });


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cartModal.classList.add("hidden");
    ordersModal.classList.add("hidden");
  }
});
["click"].forEach((ev) => {
  document.addEventListener(ev, (e) => {
    
    if (!e.target.closest(".modal-inner") && e.target.closest(".modal")) {
      e.target.closest(".modal").classList.add("hidden");
    }
  });
});


(function initSlider() {
  const slider = document.getElementById("imageSlider");
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll(".slide"));
  let idx = 0;
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === 0);
    s.setAttribute("aria-hidden", i === 0 ? "false" : "true");
  });

  const next = () => {
    slides[idx].classList.remove("active");
    slides[idx].setAttribute("aria-hidden", "true");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
    slides[idx].setAttribute("aria-hidden", "false");
  };
  let t = setInterval(next, 4000);


  slider.addEventListener("mouseenter", () => clearInterval(t));
  slider.addEventListener("mouseleave", () => (t = setInterval(next, 4000)));
  slider.addEventListener("focusin", () => clearInterval(t));
  slider.addEventListener("focusout", () => (t = setInterval(next, 4000)));
})();


ensureRatings();
populateBoxes();
renderProducts(products);
updateCartCount();
