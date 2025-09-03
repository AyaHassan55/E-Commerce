const container = document.getElementById("products-container");
const pagination = document.getElementById("pagination");


fetch("data/products.json")
    .then(response => response.json())
    .then(data => {
    data.forEach(product => {
        
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
const arrow = document.getElementById("toggleArrow");
const filterBox = document.getElementById("filterOptions");

arrow.addEventListener("click", () => {
    filterBox.classList.toggle("hidden");
    arrow.classList.toggle("fa-chevron-up");
    arrow.classList.toggle("fa-chevron-down");
});