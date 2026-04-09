// Initialize Supabase Client
const { createClient } = supabase;
const supabaseUrl = "https://yfpxelvcaybubvqnsrbu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcHhlbHZjYXlidWJ2cW5zcmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDMyNTcsImV4cCI6MjA5MTIxOTI1N30.8fUNKnuk0fIMa2MHEFmCvpYxNGPhyyNPnQx6tvAIKrU";
const _supabase = createClient(supabaseUrl, supabaseKey);

export const fetchProducts = async () => {
  // This is the JS version of "SELECT * FROM products"
  const { data, error } = await _supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching SQL data:", error);
    return [];
  }
  return data;
};

export const getStats = (productsTable) => {
  const totalValue = productsTable.reduce(
    (acc, p) => acc + p.price * p.stock,
    0,
  );

  // Strictly Low Stock: More than 0 but less than 10
  const lowStock = productsTable.filter(
    (p) => p.stock > 0 && p.stock < 10,
  ).length;

  // Strictly Out of Stock: Exactly 0
  const outOfStock = productsTable.filter((p) => p.stock === 0).length;

  return {
    total: productsTable.length,
    lowStock,
    outOfStock,
    value: totalValue.toLocaleString("en-IN"),
  };
};
