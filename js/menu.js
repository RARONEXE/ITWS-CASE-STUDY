/* MENU PAGE */

const products = {
  coffee: [
    {
      id: "coffee1",
      name: "Matcha Latte",
      description: "Ceremonial-grade matcha blended with milk for a smooth, earthy finish and a vibrant green hue.",
      price: 145,
      type: "Signature Drink",
      image: "../assets/image-01.jpeg",
      details: "A mellow, creamy matcha latte balanced with subtle sweetness and a velvety finish that feels both refreshing and comforting."
    },
    {
      id: "coffee2",
      name: "Tiramisu Latte",
      description: "Espresso and cream layered with cocoa notes for a dessert-inspired sip.",
      price: 155,
      type: "Signature Drink",
      image: "../assets/image-03.jpeg",
      details: "Inspired by classic tiramisu, this latte brings together espresso, creamy milk, and gentle cocoa warmth for a rich, indulgent finish."
    },
    {
      id: "coffee3",
      name: "Strawberry Cream",
      description: "Fresh strawberry flavor paired with whipped cream for a bright, sweet finish.",
      price: 150,
      type: "Fruit Drink",
      image: "../assets/image-07.jpeg",
      details: "A chilled strawberry cream drink with soft vanilla notes and a smooth, fruity taste that stays light and refreshing from the first sip to the last."
    }
  ],
  pastries: [
    {
      id: "pastry1",
      name: "Fresh Croissant",
      description: "Flaky layers and a buttery finish baked for slow, cozy mornings.",
      price: 90,
      type: "Pastry",
      image: "../assets/image-15.jpeg",
      details: "Baked daily for crisp, airy layers that shatter gently with each bite, making it the perfect companion to a hot latte or a quiet coffee break."
    },
    {
      id: "pastry2",
      name: "Ube Crumble Muffin",
      description: "Soft, naturally purple ube with a crisp crumble topping and a lightly sweet finish.",
      price: 110,
      type: "Muffin",
      image: "../assets/image-10.jpeg",
      details: "Tender and comforting, this ube muffin brings a mild sweetness and a buttery crumble texture that adds just the right amount of crunch."
    },
    {
      id: "pastry3",
      name: "Chocolate Muffin",
      description: "Deep cocoa flavor and a tender crumb for a warm, indulgent bite.",
      price: 110,
      type: "Muffin",
      image: "../assets/image-14.jpeg",
      details: "Rich but not heavy, this chocolate muffin is soft, cozy, and satisfying with a balanced cocoa flavor that pairs especially well with coffee."
    }
  ]
};

let currentCategory =
  window.location.hash === "#pastries" ? "pastries" : "coffee";
const categoryButtons = document.querySelectorAll(".tab");
const productTable = document.getElementById("products");

function displayProducts(category) {
  if (!products[category]) {
    return;
  }

  currentCategory = category;
  productTable.innerHTML = "";

  categoryButtons.forEach(function (button) {
    const isActive = button.getAttribute("data-category") === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });

  products[category].forEach(function (product) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="product-cell">
          <img class="product-image" src="${product.image}" alt="${product.name}">
          <div><strong>${product.name}</strong></div>
        </div>
      </td>
      <td>${product.description}</td>
      <td>${product.type}</td>
      <td><strong>₱${product.price}</strong></td>
      <td>
        <button class="view-btn" type="button" data-product="${product.id}">
          View Details
        </button>
      </td>
    `;

    productTable.appendChild(row);
  });
}

function findProduct(productId) {
  return products.coffee.concat(products.pastries).find(function (product) {
    return product.id === productId;
  });
}

function showProductDetails(productId) {
  const product = findProduct(productId);

  if (!product) {
    return;
  }

  document.getElementById("detailCategory").textContent =
    product.type.toUpperCase();
  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailDescription").textContent = product.details;
  document.getElementById("detailPrice").textContent = "₱" + product.price;

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;

  const detailArt = document.getElementById("detailArt");
  detailArt.replaceChildren(image);
  window.CafeSite.showPage("item-detail");
}

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    displayProducts(button.getAttribute("data-category"));
  });
});

document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-product]");

  if (button) {
    showProductDetails(button.getAttribute("data-product"));
  }
});

document.getElementById("detailBack").addEventListener("click", function () {
  window.CafeSite.showPage("menu");
});

document.addEventListener("cafe:pagechange", function (event) {
  if (event.detail.pageId === "menu") {
    displayProducts(currentCategory);
  }
});

displayProducts(currentCategory);
