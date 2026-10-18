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

El proyecto [`axiaeyewear`](https://axiaeyewear.pages.dev/) está conectado a `CAMIZOCA/axiaeyewear`. Cada push a `main` activa una compilación y despliegue automático. La web pública está en [axiaeyewear.com](https://axiaeyewear.com/); `www` redirige con 301 al dominio principal. Web Analytics está habilitado.

Configuración del build:

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22 o superior (`NODE_VERSION=22` si el entorno no lo selecciona)

Email Routing ya está habilitado para el dominio. El destino `opticaandina.ec@gmail.com` está pendiente de verificación en ese buzón. En cuanto se verifique, crea una regla de `hello@axiaeyewear.com` hacia ese destino y prueba la recepción. Hasta entonces, el correo publicado en la web aún no recibirá mensajes.

## Catálogo

Los modelos están en `src/data/products.json`. Los nombres actuales son descriptivos hasta confirmar códigos oficiales. Cada entrada tiene un estado `unknown`, `available` o `sold_out`. Solo al confirmar existencias cambia ese estado. Los precios opcionales no se publican todavía. El script `scripts/build-assets.mjs` valida que las 101 fotos estén asignadas, sin ángulos faltantes ni duplicados.

La selección se guarda en `localStorage` y crea una consulta por WhatsApp. Esta versión no acepta pagos ni reserva inventario.

Gafas de sol contiene diez productos independientes, uno por cada imagen del grupo original `05_46`. `photoIndexes` asigna explícitamente el número del archivo de origen a cada producto; sus galerías se numeran desde `01` dentro de su propio directorio. Solar Humo conserva su URL y solo la primera fotografía. Los nombres y colores son descriptivos, basados en las imágenes; las monturas fotografiadas junto a un clip solar se identifican como tales y requieren confirmar su configuración. El build valida que ninguna fotografía quede duplicada o sin asignar y elimina únicamente las variantes generadas que ya no correspondan a una galería.

## Imágenes y fuentes

Clips contiene 15 productos a partir de sus 29 fotografías: 14 fichas con vista frontal y casi lateral, y Clip Canela con una sola foto disponible. Se emparejaron por contorno, puente, color, bisagras y forma del clip; la galería presenta primero el frente con el clip solar colocado y después el armazón con el clip separado. La numeración original no es consecutiva en todas las parejas: Pizarra y Cristal usan los índices `[10, 1]`, y Miel `[4, 1]`. Las tres URLs existentes se conservan. Los nombres nuevos son descriptivos y la configuración incluida, el precio y la disponibilidad se confirman con Óptica Andina.

Screen Glasses contiene 31 monturas identificadas visualmente a partir de sus 62 fotografías. Cada ficha reúne únicamente una vista frontal y una casi lateral del mismo armazón, en ese orden, mediante `photoIndexes`. Se compararon silueta, color, puente, bisagras y patillas; los seis grupos de diez fotos se dividieron en cinco parejas cada uno y Cristal conserva su pareja original. Las siete URLs previas se mantienen para la primera pareja de su grupo. Los nombres nuevos son descriptivos hasta confirmar los códigos oficiales; no se atribuyen tratamientos ni filtros a los armazones.

Las colecciones y Apparel usan un banner fotográfico compacto compartido y navegación directa al catálogo. Las cuatro campañas con modelos se conservan en `brand/collection-campaigns/`; su [documentación, prompts y validación](brand/collection-campaigns/README.md) describe las referencias y el flujo. El build genera 16 variantes AVIF/WebP para escritorio y móvil. Las condiciones esenciales permanecen junto al catálogo y los textos editoriales se muestran después de los productos.

- Logo oficial: [Óptica Andina](https://www.opticaandina.com.ec/storage/brands/01KNK5321FVG4EAYBPNZAJFRA3.png), conservado en `brand/logo-axia-original.png`.
- Imágenes de campaña para escritorio y móvil: retrato editorial generado para este proyecto usando como referencia la fotografía original del modelo Solar Humo. Originales en `brand/hero-campaign-desktop.png` y `brand/hero-campaign-mobile.png`; el build crea archivos WebP optimizados. La anterior imagen editorial permanece archivada en `brand/hero-editorial-original.png`.
- Fotos de producto: archivos suministrados en las carpetas `AXIA H...` y `AXIA MUJER...`, sin alterar las monturas.

## Pendientes comerciales

Antes de activar venta directa: vincular código oficial a cada modelo, aprobar precios, verificar stock y acordar pagos, envíos, cambios, devoluciones y garantías con Óptica Andina.
