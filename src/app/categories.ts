export interface Category {
  displayName: string;
  name: string;
  isClosed: boolean;
  imageUrl: string;
};

function getImageUrl(catName: string): string {

  return `https://www.radioeins.de/content/dam/rbb/rad/bilder0/${catName}/quality=205/size=300x170.png`
}

export const categories: Array<Category> = [
  {
    displayName: 'RADIO ON - Die 100 besten Lieder übers RADIO',
    name: 'Top100Radio',
    isClosed: true,
    imageUrl: getImageUrl('202207/10_07_radio_16_9.png.png'),
  },
  {
    displayName: "LET'S TALK ABOUT ... - Die 100 besten Lieder übers SEX",
    name: 'Top100Sex',
    isClosed: true,
    imageUrl: getImageUrl('202207/17_07_sex_16_9.png.png'),
  },
  {
    displayName: "ICH GEB' GAS - Die 100 besten NDW-Lieder",
    name: 'Top100NDW',
    isClosed: true,
    imageUrl: getImageUrl('202207/24_07_NDW_16_9.png.png'),
  },
  {
    displayName: 'FEMALE POWER - Die 100 besten Lieder von Frauen',
    name: 'Top100Frauen',
    isClosed: false,
    imageUrl: getImageUrl('202207/31_07_frauen_16_9.png.png'),
  },
  {
    displayName: 'JEANS ON - Die 100 besten Songs über Klamotten',
    name: 'Top100Clothes',
    isClosed: false,
    imageUrl: getImageUrl('202207/07_08_jeans_klamotten_16_9.png.png'),
  },
  {
    displayName: 'ROCK HARD - Die 100 besten Hard Rock und Heavy Metal Songs',
    name: 'Top100Rock',
    isClosed: false,
    imageUrl: getImageUrl('202207/14_08_hardrock_metal_16_9.png.png'),
  },
  {
    displayName: 'NINETIES - Die 100 besten Songs der 90er-Jahre',
    name: 'Top100Ninties',
    isClosed: false,
    imageUrl: getImageUrl('202207/21_08_90er_16_9.png.png'),
  },
  // {
  //   displayName: 'We Are Family - Die 100 besten Familienlieder',
  //   name: 'Top100Family',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_familie_16_92.png.png/quality=205/size=300x170.png'
  // },
  // {
  //   displayName: 'Magic Numbers - Die 100 besten Songs mit Zahlen im Titel',
  //   name: 'Top100Numbers',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_zahlen_16_92.png.png/quality=205/size=300x170.png'
  // },
  // {
  //   displayName: 'Animals - Die 100 besten Lieder mit Tieren',
  //   name: 'Top100Animals',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_tiere_16_92.png.png/quality=205/size=300x170.png'
  // },
  // {
  //   displayName: 'Flying High - Die 100 besten Drogenlieder',
  //   name: 'Top100Drugs',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_drogen_16_91.png.png/quality=205/rendition=drogen43n.png/size=300x170.png'
  // },
  // {
  //   displayName: 'Eighties - Die 100 besten Lieder der 80er',
  //   name: 'Top100Eighties',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/top100_80er_16.png.png/quality=205/rendition=musiksommer_achtziger_4_3.png/size=300x170.png'
  // },
  // {
  //   displayName: 'On The Road - Die 100 besten Mobilitätslieder',
  //   name: 'Top100Mobility',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_mobilitaet_16_92.png.png/quality=205/rendition=musiksommer_mobilitaet_4_3.png/size=300x170.png'
  // },
  // {
  //   displayName: 'Instrumentals - Die 100 besten Instrumentallieder',
  //   name: 'Top100Instrumentals',
  //   isClosed: true,
  //   imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_instrumental_16_92.png.png/quality=205/rendition=musiksommer_instrumental_4_3.png/size=300x170.png'
  // },
]
