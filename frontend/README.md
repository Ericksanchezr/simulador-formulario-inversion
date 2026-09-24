# Simulador de Portafolio – Frontend

🔗 **Demo en producción:** https://frontend-two-lyart-pm1lgeulzd.vercel.app

SPA construida con **React + Vite + TailwindCSS** que simula el portafolio de inversiones de un cliente: muestra una tabla con las inversiones (activo, tipo, monto, rentabilidad, fecha) y permite agregar nuevas inversiones desde un formulario. Todo el estado se maneja en memoria con `useState` (no hay backend real conectado).

## Stack

- React 19 + Vite
- TailwindCSS 4
- Estado local con `useState` (sin librerías externas de estado)

## Estructura

```
frontend/
├── src/
│   ├── components/
│   │   ├── InvestmentForm.jsx    # Formulario para agregar inversiones
│   │   ├── InvestmentTable.jsx   # Tabla de inversiones
│   │   └── PortfolioSummary.jsx  # Tarjetas resumen (total, promedio, etc.)
│   ├── data/
│   │   └── mockInvestments.js    # Datos mock iniciales
│   ├── App.jsx                   # Composición y estado principal
│   └── main.jsx
└── index.html
```

## Cómo correr en local

Requisitos: Node.js 18+

```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build de producción

```bash
npm run build
npm run preview   # sirve el build localmente para verificarlo
```

## Despliegue en Vercel

Este proyecto está conectado a Vercel vía Git: cada `git push` a `main` dispara un
deploy automático a producción (Root Directory configurado en `frontend`).

### Opción A — Dashboard de Vercel (recomendado)

1. Sube este repositorio a GitHub (ver README raíz del proyecto).
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Click en **Add New… → Project** y selecciona el repositorio.
4. Como el repo contiene dos carpetas (`frontend` y `backend`), en **Root Directory** selecciona `frontend`.
5. Vercel detecta automáticamente el framework (Vite). Configuración por defecto:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click en **Deploy**. En unos segundos obtendrás una URL pública (ej. `https://tu-proyecto.vercel.app`).

### Opción B — Vercel CLI

```bash
npm install -g vercel
cd frontend
vercel        # sigue las instrucciones (primera vez crea el proyecto)
vercel --prod # despliegue a producción
```

## Notas

- Los datos son simulados (`src/data/mockInvestments.js`); no se conecta a la API del Ejercicio 2, ya que el ejercicio no lo requiere.
- Las inversiones agregadas desde el formulario solo persisten en memoria durante la sesión del navegador (se pierden al recargar), tal como pide el enunciado ("no es necesario backend real").
