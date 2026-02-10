const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3001;

// ==========================
//   CORS SIMPLE
// ==========================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ==========================
//   SERVICES CONFIGURÉS
// ==========================
const services = {
  trajets: "http://localhost:8000",       
  utilisateurs: "http://localhost:8001",        
  billets: "http://localhost:9002",       
};

// ==========================
//   ROUTES PROXY PAR SERVICE
// ==========================

// Trajets
app.use(
  "/api/trajets",
  createProxyMiddleware({
    target: services.trajets,
    changeOrigin: false,
    pathRewrite: { "^/api/trajets": "" }, 
  })
);

// Utilisateurs (corrigé)
app.use(
  "/api/utilisateurs",
  createProxyMiddleware({
    target: services.utilisateurs,      // http://localhost:8001
    changeOrigin: false,
    pathRewrite: { "^/api/utilisateurs": "" }, // CORRECTION ICI
  })
);

// Tickets
app.use(
  "/api/billets",
  createProxyMiddleware({
    target: services.billets,
    changeOrigin: false,
    pathRewrite: { "^/api/billets": "" }, 
  })
);

// ==========================
//   HEALTH CHECK
// ==========================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    services: Object.keys(services),
    message: "Gateway opérationnel",
  });
});

// ==========================
//   ROUTES INCONNUES / API NON TROUVÉE
// ==========================
app.use("/api", (req, res) => {
  res.status(503).json({
    error: "Service non disponible",
    message: "Route non trouvée dans le gateway",
    available_routes: [
      "/api/trajets",
      "/api/utilisateurs", // CORRECTION ICI
      "/api/tickets",
      "/health",
    ],
  });
});

// ==========================
//   CATCH ALL 404
// ==========================
app.use((req, res) => {
  res.status(404).json({
    error: "Route non trouvée",
    message: "Utilisez /api/trajets, /api/utilisateurs, /api/tickets ou /health", // CORRECTION ICI
  });
});

// ==========================
//   START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Gateway démarré: http://localhost:${PORT}`);
  console.log("📡 Services configurés:");
  Object.entries(services).forEach(([name, url]) => {
    console.log(`   👉 ${name}: ${url}`);
  });
});