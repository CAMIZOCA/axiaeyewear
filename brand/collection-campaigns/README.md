# Campañas de colección AXIA

Cuatro imágenes creadas con la herramienta integrada `image_gen`, a partir de referencias del catálogo. Los PNG de esta carpeta son los originales elegidos; `prompts.json` conserva los prompts de generación y `clips-revision.txt` la corrección del accesorio solar. Las fotografías del catálogo permanecen intactas.

| Archivo | Referencia de producto |
| --- | --- |
| `sunglasses.png` | `public/assets/catalog/solar-humo/01-1200.webp` |
| `screen.png` | `public/assets/catalog/screen-cristal/01-1200.webp` |
| `clips.png` | `public/assets/catalog/clip-pizarra/02-1200.webp` (vista casi lateral, renumerada al separar las fichas) |
| `apparel.png` | `brand/apparel-concepts/frame-hoodie.png` |

Dirección común: luz natural suave, pared neutra, vestuario sobrio, producto protagonista y espacio para texto HTML. La revisión visual comparó silueta, color, puente, patillas y gráficos con las referencias. Se corrigió el accesorio de Clips para eliminar el borde grueso inventado en la primera versión. Estas campañas son imágenes generadas, no fotografías documentales del ajuste de las gafas o de una prenda fabricada.

`scripts/build-campaigns.mjs`, invocado por `npm run assets`, genera 16 derivados AVIF/WebP bajo `public/assets/campaigns/`: escritorio y encuadre móvil para cada campaña. Los derivados se reconstruyen y no se versionan. Los encuadres y el producto protagonista se configuran en `src/data/campaigns.ts`.

## Validación del flujo inicial

Actualización posterior: Gafas de sol contiene ahora diez productos independientes, uno por cada imagen que estaba agrupada en Solar Humo. Se comprobaron las diez fichas, su fotografía exclusiva, el listado en móvil y escritorio y la selección independiente para consulta por WhatsApp. La tabla y las mediciones siguientes documentan la implementación inicial del banner, anterior a esa ampliación.

Screen Glasses se reorganizó posteriormente en 31 monturas, con 62 fotos distribuidas en parejas frontal/casi lateral. El banner sigue mostrando Cristal y las fichas previas conservan sus URLs para la primera pareja de cada grupo.

Clips se reorganizó en 15 productos con sus 29 fotos: 14 parejas frontal/casi lateral y una única fotografía para Clip Canela. El banner conserva Clip Pizarra; las tres URLs iniciales se mantienen para sus respectivos armazones.

Se probaron Sunglasses, Screen Glasses, Clips y Apparel en 360 × 640, 390 × 844, 1366 × 768 y 1440 × 900, usando el build estático en Astro Preview. En las 16 combinaciones aparecen sin scroll dos fotografías completas de producto, o una en Sunglasses, que tiene un único modelo. Sin desbordamiento horizontal ni imágenes iniciales rotas.

Inicio de la primera imagen de catálogo, medido desde el borde superior de la pantalla en 360 × 640:

| Sección | Antes | Después |
| --- | ---: | ---: |
| Sunglasses | 437 px | 332 px |
| Screen Glasses | 619 px | 358 px |
| Clips | 597 px | 358 px |
| Apparel | 1.449 px | 418 px |

También se comprobó el enlace para saltar al contenido, foco del ancla del catálogo, navegación activa, cierre del menú con Escape, selección de un modelo, enlace de consulta por WhatsApp, accesos a Hoodies y Caps, fichas de conceptos y preferencia de movimiento reducido. La comprobación de WhatsApp inspecciona el enlace generado, sin enviar mensajes.

El muestreo local de LCP fue de 36–84 ms antes y 40–80 ms después; CLS observado después: 0. Estos valores corresponden a localhost sin limitación de red/CPU y con caché mixta: sirven como comprobación local, no como predicción de rendimiento en producción. Las campañas móviles en AVIF pesan aproximadamente 11–16 KB. El objetivo público de LCP ≤ 2,5 s debe comprobarse después de un despliegue autorizado.

Comprobaciones ejecutadas: `npm run verify`, revisión visual de capturas de las 16 combinaciones y recorrido funcional. Evidencia local y scripts de navegador en `output/playwright/collection-*` y `output/playwright/after-*.png`.

La validación descrita se realizó en local antes del commit y el push.
