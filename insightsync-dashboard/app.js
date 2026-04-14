import { fetchProducts, getStats } from "./database.js";
import { getAIAdvice } from "./ai-engine.js";

let productsData = []; 

const renderUI = async () => {
  const list = document.getElementById("product-list");

  // FETCH: Getting real-time data from Supabase SQL
  productsData = await fetchProducts();
  const stats = getStats(productsData);

  // Update Stats Cards
  document.getElementById("total-products").innerText = stats.total;
  document.getElementById("low-stock-count").innerText = stats.lowStock;
  document.getElementById("out-of-stock-count").innerText = stats.outOfStock;
  document.getElementById("total-value").innerText = `₹${stats.value}`;

  // Render Table
  list.innerHTML = productsData
    .map(
      (p) => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.stock} units</td>
            <td>₹${p.price}</td>
            <td>
    <span class="badge" style="color: ${p.stock === 0 ? "#ef4444" : p.stock < 10 ? "#f59e0b" : "#10b981"}">
        ${p.stock === 0 ? "Out of Stock" : p.stock < 10 ? "Low Stock" : "In Stock"}
    </span>
</td>
        </tr>
    `,
    )
    .join("");
};

// AI Consultant Logic
document
  .getElementById("ai-consultant-btn")
  .addEventListener("click", async () => {
    const box = document.getElementById("ai-response-box");
    const textField = document.getElementById("ai-text");

    box.classList.remove("hidden");
    textField.innerText = "Consulting Gemini AI...";

    // Sending the live SQL data to Gemini
    const advice = await getAIAdvice(productsData);
    textField.innerText = advice;
  });

// Initial Load
renderUI();

// Search Logic
let timeout;
document.getElementById("table-search").addEventListener("input", (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = productsData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm),
    );

    // Re-render only the table rows
    const list = document.getElementById("product-list");
    list.innerHTML = filtered
      .map(
        (p) => `
            <tr>
                <td>#${p.id}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.stock} units</td>
                <td>₹${p.price}</td>
                <td><span class="badge" style="color: ${p.stock < 10 ? "#ef4444" : "#10b981"}">
                    ${p.stock === 0 ? "Out of Stock" : p.stock < 10 ? "Low Stock" : "In Stock"}
                </span></td>
            </tr>
        `,
      )
      .join("");
  }, 300);
});
// Tab Switching Logic
const inventoryView = document.getElementById("inventory-view");
const salesView = document.getElementById("sales-view");
const pageTitle = document.getElementById("page-title");

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
   
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

   
    if (item.innerText.includes("Sales Analysis")) {
      inventoryView.classList.add("hidden");
      salesView.classList.remove("hidden");
      pageTitle.innerText = "Sales Analysis";
      document.getElementById("ai-consultant-btn").style.display = "none";
    
      renderSalesChart();
    } else {
      salesView.classList.add("hidden");
      inventoryView.classList.remove("hidden");
      pageTitle.innerText = "Business Overview";
      document.getElementById("ai-consultant-btn").style.display = "block";
    }
  });
});
function renderSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Monthly Revenue (₹)",
       
          data: [
            450000, 520000, 480000, 610000, 590000, 618000, 650000, 700000,
            680000, 720000, 750000, 800000,
          ],
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#6366f1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.5,
      plugins: {
        legend: {
          display: false, 
        },
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45, 
            minRotation: 45,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
           
            callback: function (value) {
              return "₹" + value.toLocaleString();
            },
          },
        },
      },
    },
  });
}
