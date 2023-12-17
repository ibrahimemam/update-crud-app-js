document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
  });
  
function addProduct() {
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');
    const productCategoryInput = document.getElementById('productCategory');
    const productList = document.getElementById('product-list');
  
    if (
      productNameInput.value.trim() !== '' &&
      productDescriptionInput.value.trim() !== '' &&
      productPriceInput.value.trim() !== '' &&
      productCategoryInput.value.trim() !== ''
    ) {
      const productItem = document.createElement('li');
      productItem.classList.add('list-group-item');
      productItem.innerHTML = `
        <h5>${productNameInput.value}</h5>
        <p><strong>Description:</strong> ${productDescriptionInput.value}</p>
        <p><strong>Price:</strong> $${productPriceInput.value}</p>
        <p><strong>Category:</strong> ${productCategoryInput.value}</p>
        <button type="button" class="btn btn-warning btn-sm mr-2" onclick="updateProduct('${productNameInput.value}', '${productDescriptionInput.value}', '${productPriceInput.value}', '${productCategoryInput.value}')">Update</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(this)">Delete</button>
      `;
  
      productList.appendChild(productItem);
  
      saveProduct(
        productNameInput.value,
        productDescriptionInput.value,
        productPriceInput.value,
        productCategoryInput.value
      );
      clearInputs();
    }
  }
  
  function deleteProduct(button) {
    const productItem = button.parentNode;
    const productName = productItem.querySelector('h5').textContent;
  
    productItem.remove();
    removeProductFromStorage(productName);
  }
  
function updateProduct(name, description, price, category) {
    const newName = prompt('Enter new product name:', name);
    const newDescription = prompt('Enter new product description:', description);
    const newPrice = prompt('Enter new product price:', price);
    const newCategory = prompt('Enter new product category:', category);
  
    if (
      newName !== null &&
      newDescription !== null &&
      newPrice !== null &&
      newCategory !== null
    ) {
      const productItem = document.createElement('li');
      productItem.classList.add('list-group-item');
      productItem.innerHTML = `
        <h5>${newName}</h5>
        <p><strong>Description:</strong> ${newDescription}</p>
        <p><strong>Price:</strong> $${newPrice}</p>
        <p><strong>Category:</strong> ${newCategory}</p>
        <button type="button" class="btn btn-warning btn-sm mr-2" onclick="updateProduct('${newName}', '${newDescription}', '${newPrice}', '${newCategory}')">Update</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(this)">Delete</button>
      `;
  
      const productList = document.getElementById('product-list');
      const oldProductItem = findProductItemByName(name);
      productList.replaceChild(productItem, oldProductItem);
  
      updateProductInStorage(name, newName, newDescription, newPrice, newCategory);
    }
  }
  
function saveProduct(name, description, price, category) {
    const products = getProductsFromStorage();
    products.push({ name, description, price, category });
    localStorage.setItem('products', JSON.stringify(products));
  }
  
function removeProductFromStorage(name) {
    const products = getProductsFromStorage();
    const index = products.findIndex(p => p.name === name);
    if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
  
  function updateProductInStorage(oldName, newName, newDescription, newPrice, newCategory) {
    const products = getProductsFromStorage();
    const index = products.findIndex(p => p.name === oldName);
    if (index !== -1) {
      products[index] = { name: newName, description: newDescription, price: newPrice, category: newCategory };
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
  

function loadProducts() {
    const productList = document.getElementById('product-list');
    const products = getProductsFromStorage();
  
    products.forEach(function (product) {
      const productItem = document.createElement('li');
      productItem.classList.add('list-group-item');
      productItem.innerHTML = `
        <h5>${product.name}</h5>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <button type="button" class="btn btn-info btn-sm mr-2" onclick="showProductDetails('${product.name}', '${product.description}', '${product.price}', '${product.category}')">Show Details</button>
        <button type="button" class="btn btn-warning btn-sm mr-2" onclick="updateProduct('${product.name}', '${product.description}', '${product.price}', '${product.category}')">Update</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(this)">Delete</button>
      `;
  
      productList.appendChild(productItem);
    });
  }
function getProductsFromStorage() {
        return JSON.parse(localStorage.getItem('products')) || [];
      }      
           
function showProductDetails(name, description, price, category) {
        alert(`Product Details:\n\nName: ${name}\nDescription: ${description}\nPrice: $${price}\nCategory: ${category}`);
      }

function findProductItemByName(name) {
        const productList = document.getElementById('product-list');
        const items = productList.getElementsByClassName('list-group-item');
        for (const item of items) {
          if (item.querySelector('h5').textContent === name) {
            return item;
          }
        }
        return null;
      } 
 function clearInputs() {
        document.getElementById('productName').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productCategory').value = '';
      }           