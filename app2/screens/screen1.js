import { navigateTo, socket } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Screen 1 - App 2</h2>
        <p>Vista de estadísticas y resumen de datos</p>
        
        <div class="stats-section">
          <h3>Estadísticas Generales</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Total de Productos</h4>
              <div id="total-products">-</div>
            </div>
            <div class="stat-card">
              <h4>Total de Usuarios</h4>
              <div id="total-users">-</div>
            </div>
            <div class="stat-card">
              <h4>Total de Órdenes</h4>
              <div id="total-orders">-</div>
            </div>
            <div class="stat-card">
              <h4>Posts con Tutorial</h4>
              <div id="total-tutorials">-</div>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <h3>Resumen de Categorías de Productos</h3>
          <div id="categories-summary">Cargando...</div>
        </div>

        <div class="recent-section">
          <h3>Órdenes Recientes</h3>
          <div id="recent-orders">Cargando...</div>
        </div>

        <p class="waiting-message">⏳ Esperando evento de cambio de pantalla desde App1...</p>
      </div>
      `;

  loadStatistics();

  socket.on("next-screen", (data) => {
    navigateTo("/screen2", { name: "Hola" });
  });

  async function loadStatistics() {
    try {
    
      const [products, users, orders, tutorials] = await Promise.all([
        fetch('http://localhost:5050/products').then(r => r.json()),
        fetch('http://localhost:5050/users').then(r => r.json()),
        fetch('http://localhost:5050/orders').then(r => r.json()),
        fetch('http://localhost:5050/posts/search/tutorial').then(r => r.json())
      ]);

      document.getElementById('total-products').textContent = products.length;
      document.getElementById('total-users').textContent = users.length;
      document.getElementById('total-orders').textContent = orders.length;
      document.getElementById('total-tutorials').textContent = tutorials.length;

      const categories = {};
      products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + 1;
      });
      
      const categoriesHtml = Object.entries(categories)
        .map(([category, count]) => `<div class="category-item">${category}: ${count} productos</div>`)
        .join('');
      
      document.getElementById('categories-summary').innerHTML = categoriesHtml || '<div class="category-item">No hay categorías</div>';

      const recentOrders = orders.slice(0, 3);
      const ordersHtml = recentOrders.length > 0 
        ? recentOrders.map(order => `
            <div class="order-item">
              Orden #${order.id} - Total: $${order.total} - ${new Date(order.created_at).toLocaleDateString()}
            </div>
          `).join('')
        : '<div class="order-item">No hay órdenes</div>';
      
      document.getElementById('recent-orders').innerHTML = ordersHtml;

    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      document.getElementById('categories-summary').innerHTML = 'Error cargando datos';
      document.getElementById('recent-orders').innerHTML = 'Error cargando datos';
    }
  }
}
