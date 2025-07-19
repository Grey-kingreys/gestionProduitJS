document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const userName = document.getElementById("userName");
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const logoutBtn = document.getElementById("logoutBtn");
    const searchInput = document.getElementById("searchInput");
    let editingIndex = -1;


    if(!user) {
        window.location.href = "../index.html";
    }
    else {
        userName.textContent = user.username;
    }

    function getProducts() {
        const products = JSON.parse(localStorage.getItem("products"))  || {};
        return products[user.email] || [];
    }

    function saveProducts(products) {
        const allProducts = JSON.parse(localStorage.getItem("products")) || {};
        allProducts[user.email] = products;
        localStorage.setItem("products", JSON.stringify(allProducts));
    }

    function renderProducts() {
        const products = getProducts()
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        productList.innerHTML = "";

        products.forEach((product, index) =>{
            if (product.name.toLowerCase().includes(searchTerm)) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantite}</td>
                <td><button onclick = "editProduct(${index})">editer</button>
                <button onclick = "deleteProduct(${index})">Supprimer</button></td>
                `;
                productList.appendChild(tr);
            };
        });
    };

    //Ajouter un produit

    productForm.addEventListener("submit", function(e){
        e.preventDefault();
        const name = document.getElementById("productName").value.trim();
        const price = parseFloat(document.getElementById("productPrice").value);
        const quantite = parseFloat(document.getElementById("QtPrice").value);

        const products = getProducts();
        if (editingIndex === -1) {
            products.push({name, price, quantite});
        }
        else {
            products[editingIndex] = {name,price,quantite};
            editingIndex = -1;
        }

        saveProducts(products);
        productForm.reset();
        renderProducts();
    });

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        window.location.href = "../index.html";
    })

    if(searchInput){
        searchInput.addEventListener("input", renderProducts);
    }

    //alter and delete

    window.deleteProduct = function(index){
        const products = getProducts();
        products.splice(index, 1);
        saveProducts(products);
        renderProducts();
    };

    window.editProduct = function(index) {
        const products = getProducts();
        document.getElementById("productName").value = products[index].name;
        document.getElementById("productPrice").value = products[index].price;
        document.getElementById("QtPrice").value = products[index].quantite;
        editingIndex = index;    
    };
    renderProducts();
})