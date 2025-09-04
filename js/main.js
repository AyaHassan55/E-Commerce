const container = document.getElementById("products-container");
const pagination = document.getElementById("pagination");
let productsData = [];

// Function to render products
function displayProducts(products) {
    container.innerHTML = ""; //  

    products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-6 col-lg-3 mb-4"; 
        col.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h6 class="card-title">${product.name}</h6>
                    <p>₹ ${product.price}</p>
                </div>
            </div>
        `;
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
