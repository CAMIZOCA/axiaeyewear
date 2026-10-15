# AXIA Eyewear

Showroom estático de AXIA Eyewear. Construido con Astro y preparado para Cloudflare Pages. Las 101 fotografías originales y el logo oficial están versionados; durante el build se generan 404 variantes AVIF/WebP para el catálogo.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm ci
npm run dev
npm run check
npm run build
```

La web local estará en `http://localhost:4321`. El comando `build` genera `dist/`.

## Cloudflare Pages

Conecta el repositorio `CAMIZOCA/axiaeyewear` a Pages con la rama de producción `main`:

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22 o superior (`NODE_VERSION=22` si el entorno no lo selecciona)

Asocia `axiaeyewear.com` como dominio personalizado. Configura `www.axiaeyewear.com` y una regla 301 hacia el dominio principal. Activa Web Analytics si deseas medición. Email Routing debe recibir `hello@axiaeyewear.com` y reenviar a `opticaandina.ec@gmail.com`; Cloudflare pedirá verificar el destino.

## Catálogo

Los modelos están en `src/data/products.json`. Los nombres actuales son descriptivos hasta confirmar códigos oficiales. Cada entrada tiene un estado `unknown`, `available` o `sold_out`. Solo al confirmar existencias cambia ese estado. Los precios opcionales no se publican todavía. El script `scripts/build-assets.mjs` valida que las 101 fotos estén asignadas, sin ángulos faltantes ni duplicados.

La selección se guarda en `localStorage` y crea una consulta por WhatsApp. Esta versión no acepta pagos ni reserva inventario.

## Imágenes y fuentes

- Logo oficial: [Óptica Andina](https://www.opticaandina.com.ec/storage/brands/01KNK5321FVG4EAYBPNZAJFRA3.png), conservado en `brand/logo-axia-original.png`.
- Imagen editorial de portada: generada para este proyecto con la indicación «escena editorial de lujo para fondo de hero web, piedra escultórica carbón, acento tenue de vidrio menta, luz lateral cálida y espacio negativo; sin gafas, personas, texto ni logotipo». Original en `brand/hero-editorial-original.png`.
- Fotos de producto: archivos suministrados en las carpetas `AXIA H...` y `AXIA MUJER...`, sin alterar las monturas.

## Pendientes comerciales

Antes de activar venta directa: vincular código oficial a cada modelo, aprobar precios, verificar stock y acordar pagos, envíos, cambios, devoluciones y garantías con Óptica Andina.
