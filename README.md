# Yeti BI — Landing Page

**Business Intelligence & Process Optimization Consulting**  
Medellín, Colombia

## 📁 Estructura del Proyecto

```
yeti-website/
├── app/
│   ├── page.tsx              ← Página principal (10 secciones)
│   ├── layout.tsx            ← Layout con MotionConfig
│   └── globals.css           ← Estilos globales
├── lib/
│   └── motion.ts             ← Animaciones Motion (tokens + presets)
├── public/
│   ├── yeti-landing-clean.html    ← HTML standalone ⭐
│   ├── design-reference.html      ← Referencia visual
│   ├── favicon.svg
│   └── icons.svg
└── [configs: tailwind, next, ts, postcss]
```

## 🚀 Uso

**Next.js Dev Server:**
```bash
npm install && npm run dev
# http://localhost:3000
```

**HTML Standalone:**
```
public/yeti-landing-clean.html
http://127.0.0.1:5500/public/yeti-landing-clean.html
```

## ✨ Features

- ✅ 10 secciones completas
- ✅ Animaciones Motion (glows, SVG animado, reveal on scroll)
- ✅ Layouts avanzados (auto-fit, minmax - tailwindcss-advanced-layouts)
- ✅ Tipografía premium (Playfair, Archivo, JetBrains Mono)
- ✅ Responsive (320px - 4K)
- ✅ 12KB HTML limpio
- ✅ Dark mode
- ✅ Accesibilidad

## 🎨 Paleta

- **Fondo**: #2E2640
- **Accent**: #E07B30
- **Texto**: #FFFFFF

## 🔧 Stack

- Next.js 16.2 + React + TypeScript
- Motion (motion/react)
- Tailwind CSS v4
- tailwindcss-advanced-layouts
