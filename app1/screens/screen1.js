import { makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>App 1</h2>
        
        <div class="section">
          <h3>1. Obtener todos los registros de una tabla</h3>
          <button id="get-products-btn">Get All Products</button>
          <div id="products-container"></div>
        </div>

        <div class="section">
          <h3>2. Filtrar por condición simple (price < 50)</h3>
          <button id="get-products-lt50-btn">Get Products Price < 50</button>
          <div id="products-lt50-container"></div>
        </div>

        <div class="section">
          <h3>3. Seleccionar campos específicos (users)</h3>
          <button id="get-users-btn">Get Users (username, email)</button>
          <div id="users-container"></div>
        </div>

        <div class="section">
          <h3>4. Ordenar resultados por columna</h3>
          <button id="get-orders-btn">Get Orders (ordered by created_at desc)</button>
          <div id="orders-container"></div>
        </div>

        <div class="section">
          <h3>6. Filtrar por múltiples condiciones</h3>
          <button id="get-products-filtered-btn">Get Products (price > 30 AND category = Electronics)</button>
          <div id="products-filtered-container"></div>
        </div>

        <div class="section">
          <h3>7. Buscar por texto parcial (LIKE)</h3>
          <button id="get-posts-btn">Get Posts (title contains 'tutorial')</button>
          <div id="posts-container"></div>
        </div>

        <div class="section">
          <h3>8. Paginación con limit y offset</h3>
          <button id="get-products-paginated-btn">Get Products (first 10)</button>
          <div id="products-paginated-container"></div>
        </div>

        <div class="section">
          <h3>9. Traer registros relacionados con usuario</h3>
          <button id="get-user-products-btn">Get Products by User ID 1</button>
          <div id="user-products-container"></div>
        </div>

        <div class="section">
          <button id="change-screen-btn">Change screen on app 2</button>
        </div>
    </div>
      `;

  document.getElementById("get-products-btn").addEventListener("click", getProducts);
  document.getElementById("get-products-lt50-btn").addEventListener("click", getProductsLt50);
  document.getElementById("get-users-btn").addEventListener("click", getUsers);
  document.getElementById("get-orders-btn").addEventListener("click", getOrders);
  document.getElementById("get-products-filtered-btn").addEventListener("click", getProductsFiltered);
  document.getElementById("get-posts-btn").addEventListener("click", getPosts);
  document.getElementById("get-products-paginated-btn").addEventListener("click", getProductsPaginated);
  document.getElementById("get-user-products-btn").addEventListener("click", getUserProducts);
  document.getElementById("change-screen-btn").addEventListener("click", sendEventChangeScreen);

  async function getProducts() {
    const response = await makeRequest("/products", "GET");
    const container = document.getElementById("products-container");
    container.innerHTML = `
      <h4>All Products:</h4>
      <ul>
        ${response.map(product => `<li>${product.name} - $${product.price} - ${product.category}</li>`).join('')}
      </ul>
    `;
  }

  async function getProductsLt50() {
    const response = await makeRequest("/products/price-lt-50", "GET");
    const container = document.getElementById("products-lt50-container");
    container.innerHTML = `
      <h4>Products Price < 50:</h4>
      <ul>
        ${response.map(product => `<li>${product.name} - $${product.price} - ${product.category}</li>`).join('')}
      </ul>
    `;
  }

  async function getUsers() {
    const response = await makeRequest("/users", "GET");
    const container = document.getElementById("users-container");
    container.innerHTML = `
      <h4>Users (username, email):</h4>
      <ul>
        ${response.map(user => `<li>${user.username} - ${user.email}</li>`).join('')}
      </ul>
    `;
  }

  async function getOrders() {
    const response = await makeRequest("/orders", "GET");
    const container = document.getElementById("orders-container");
    container.innerHTML = `
      <h4>Orders (ordered by created_at desc):</h4>
      <ul>
        ${response.map(order => `<li>Order #${order.id} - User: ${order.user_id} - Total: $${order.total} - Date: ${new Date(order.created_at).toLocaleString()}</li>`).join('')}
      </ul>
    `;
  }

  async function getProductsFiltered() {
    const response = await makeRequest("/products/price-gt-30-category-electronics", "GET");
    const container = document.getElementById("products-filtered-container");
    container.innerHTML = `
      <h4>Products (price > 30 AND category = Electronics):</h4>
      <ul>
        ${response.map(product => `<li>${product.name} - $${product.price} - ${product.category}</li>`).join('')}
      </ul>
    `;
  }

  async function getPosts() {
    const response = await makeRequest("/posts/search/tutorial", "GET");
    const container = document.getElementById("posts-container");
    container.innerHTML = `
      <h4>Posts (title contains 'tutorial'):</h4>
      <ul>
        ${response.map(post => `<li>${post.title} - ${post.content?.substring(0, 50)}...</li>`).join('')}
      </ul>
    `;
  }

  async function getProductsPaginated() {
    const response = await makeRequest("/products/paginated?limit=10&offset=0", "GET");
    const container = document.getElementById("products-paginated-container");
    container.innerHTML = `
      <h4>Products (first 10 - pagination):</h4>
      <ul>
        ${response.map(product => `<li>${product.name} - $${product.price} - ${product.category}</li>`).join('')}
      </ul>
    `;
  }

  async function getUserProducts() {
    const response = await makeRequest("/users/1/products", "GET");
    const container = document.getElementById("user-products-container");
    container.innerHTML = `
      <h4>Products by User ID 1:</h4>
      <ul>
        ${response.map(product => `<li>${product.name} - $${product.price} - ${product.category}</li>`).join('')}
      </ul>
    `;
  }

  async function sendEventChangeScreen() {
    const changeEventResponse = await makeRequest("/change-screen", "POST");
    console.log("changeEventResponse", changeEventResponse);
  }
}
