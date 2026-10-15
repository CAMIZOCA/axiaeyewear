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

## Imágenes y fuentes

- Logo oficial: [Óptica Andina](https://www.opticaandina.com.ec/storage/brands/01KNK5321FVG4EAYBPNZAJFRA3.png), conservado en `brand/logo-axia-original.png`.
- Imagen editorial de portada: generada para este proyecto con la indicación «escena editorial de lujo para fondo de hero web, piedra escultórica carbón, acento tenue de vidrio menta, luz lateral cálida y espacio negativo; sin gafas, personas, texto ni logotipo». Original en `brand/hero-editorial-original.png`.
- Fotos de producto: archivos suministrados en las carpetas `AXIA H...` y `AXIA MUJER...`, sin alterar las monturas.

## Pendientes comerciales

Antes de activar venta directa: vincular código oficial a cada modelo, aprobar precios, verificar stock y acordar pagos, envíos, cambios, devoluciones y garantías con Óptica Andina.
