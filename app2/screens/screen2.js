import { navigateTo } from "../app.js";

export default function renderScreen1(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        <div id="screen2">
            <h2>Laboratorio de Base de Datos - App 2</h2>
            <p>Vista detallada de productos y análisis</p>
            
            <div class="analysis-section">
              <h3>🔍 Análisis de Productos</h3>
              <div class="analysis-grid">
                <div class="analysis-card">
                  <h4>Productos por Precio</h4>
                  <div id="price-analysis">Cargando...</div>
                </div>
                <div class="analysis-card">
                  <h4>Productos por Usuario</h4>
                  <div id="user-products-analysis">Cargando...</div>
                </div>
              </div>
            </div>

            <div class="detailed-section">
              <h3>📋 Lista Completa de Productos</h3>
              <div id="all-products-list">Cargando...</div>
            </div>

            <div class="navigation-section">
              <button id="go-screen-back">← Volver a Screen 1</button>
              <button id="refresh-data">🔄 Actualizar Datos</button>
            </div>
        </div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const refreshButton = document.getElementById("refresh-data");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  refreshButton.addEventListener("click", () => {
    loadDetailedAnalysis();
  });

  loadDetailedAnalysis();

  async function loadDetailedAnalysis() {
    try {

      const products = await fetch('http://localhost:5050/products').then(r => r.json());
      
      const priceRanges = {
        'Baratos (< $30)': products.filter(p => p.price < 30).length,
        'Medios ($30-$100)': products.filter(p => p.price >= 30 && p.price <= 100).length,
        'Caros (> $100)': products.filter(p => p.price > 100).length
      };

      const priceHtml = Object.entries(priceRanges)
        .map(([range, count]) => `<div class="range-item">${range}: ${count} productos</div>`)
        .join('');

      document.getElementById('price-analysis').innerHTML = priceHtml;

      const userProducts = {};
      products.forEach(product => {
        if (product.user_id) {
          userProducts[product.user_id] = (userProducts[product.user_id] || 0) + 1;
        }
      });

      const userHtml = Object.entries(userProducts)
        .map(([userId, count]) => `<div class="user-item">Usuario ${userId}: ${count} productos</div>`)
        .join('') || '<div class="user-item">No hay productos asignados a usuarios</div>';

      document.getElementById('user-products-analysis').innerHTML = userHtml;

      const productsHtml = products.length > 0 
        ? products.map(product => `
            <div class="product-item">
              <strong>${product.name}</strong> - $${product.price} 
              <span class="category">[${product.category || 'Sin categoría'}]</span>
              ${product.user_id ? `<span class="user">👤 Usuario ${product.user_id}</span>` : ''}
            </div>
          `).join('')
        : '<div class="product-item">No hay productos</div>';

      document.getElementById('all-products-list').innerHTML = productsHtml;

    } catch (error) {
      console.error('Error cargando análisis:', error);
      document.getElementById('price-analysis').innerHTML = 'Error cargando datos';
      document.getElementById('user-products-analysis').innerHTML = 'Error cargando datos';
      document.getElementById('all-products-list').innerHTML = 'Error cargando datos';
    }
  }
}
