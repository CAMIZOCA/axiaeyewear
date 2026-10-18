export type Campaign = {
  image: string;
  alt: string;
  desktopPosition: string;
  mobilePosition: string;
  featuredSlug: string;
};

export const campaigns: Record<'sunglasses' | 'screen' | 'clips' | 'apparel', Campaign> = {
  sunglasses: {
    image: 'sunglasses',
    alt: 'Campaña AXIA: modelo con gafas Solar Humo de montura café y lunas humo.',
    desktopPosition: 'center 30%', mobilePosition: 'center 42%', featuredSlug: 'solar-humo',
  },
  screen: {
    image: 'screen',
    alt: 'Campaña AXIA: modelo con el armazón óptico Cristal transparente.',
    desktopPosition: 'center 30%', mobilePosition: 'center 42%', featuredSlug: 'screen-cristal',
  },
  clips: {
    image: 'clips',
    alt: 'Campaña AXIA: modelo con la montura rectangular Clip Pizarra azul grisáceo.',
    desktopPosition: 'center 26%', mobilePosition: 'center 40%', featuredSlug: 'clip-pizarra',
  },
  apparel: {
    image: 'apparel',
    alt: 'Visualización conceptual de Frame Hoodie AXIA carbón con firma y gráfico de gafas en menta, sobre un modelo.',
    desktopPosition: 'center 54%', mobilePosition: 'center 54%', featuredSlug: 'frame-hoodie',
  },
};
