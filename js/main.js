const container = document.getElementById("products-container");
const pagination = document.getElementById("pagination");
let productsData = [];
let cart = [];
const cartCount = document.getElementById("cart-count");


// Function to render products
function displayProducts(products) {
    container.innerHTML = ""; //  

    products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-6 col-lg-3 mb-4"; 
        col.innerHTML = `
    <div class="card product-card position-relative">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
            <h6 class="card-title">${product.name}</h6>
            <p>₹ ${product.price}</p>
        </div>
        <div class="add-to-cart position-absolute top-0 end-0 m-2 p-2 bg-dark text-white rounded-circle" title="Add to Cart" style="cursor:pointer;">
            <i class="fa-solid fa-cart-plus"></i>
        </div>
    </div>
`;

        
        // زرار إضافة للسلة
        col.querySelector(".add-to-cart").addEventListener("click", (e) => {
             e.stopPropagation(); // عشان ميعملش مشاكل مع الكارت
                addToCart(product);
        });

    
        // 
        container.appendChild(col);
    });
}

// Fetch products
fetch("data/products.json")
    .then(response => response.json())
    .then(data => {
        productsData = data;  
        displayProducts(productsData); //    

        pagination.innerHTML = `
            <li class="page-item disabled">
                <a class="page-link" href="#">&lt;</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item disabled"><span class="page-link">..</span></li>
            <li class="page-item">
                <a class="page-link" href="#">&gt;</a>
            </li>
        `;

        // 
    })
    .catch(error => console.error("Error loading products:", error));


// --------------------------------------------------------------------
// filter by checkbox


document.querySelectorAll(".filter-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
       
        const selectedCategories = Array.from(document.querySelectorAll(".filter-checkbox[data-type='category']:checked"))
                                        .map(cb => cb.value);

        const selectedCloths = Array.from(document.querySelectorAll(".filter-checkbox[data-type='cloth']:checked"))
                                    .map(cb => cb.value);

        let filtered = productsData;

        //        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }

        if (selectedCloths.length > 0) {
            filtered = filtered.filter(p => selectedCloths.includes(p.cloth));
        }

        displayProducts(filtered);
    });
});

// ---------------- Add to Cart ----------------

function addToCart(product) {
    // لو المنتج موجود نزود الكمية
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    } 

    updateCartCount();
}

// ---------------- Render Cart ----------------
function updateCartCount() {
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;
}


