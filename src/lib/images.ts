export const hero = {
  logo: '/images/hero/logo.svg',
  avatar: '/images/hero/avatar.png',
  productCard: '/images/hero/cat-house.png',
  videoCard: '/images/hero/video-card.png',
  bottomLeft: '/images/hero/dog-left.png',
  bottomCenter: '/images/hero/dog-center.png',
  bottomRight: '/images/hero/cat-right.png',
}

/** Unsplash source ids, kept so other sizes can be downloaded later if needed. */
const UNSPLASH = {
  beagle: '1543466835-00a7907e9de1',
  catGreen: '1514888286974-6c03e2ca1dba',
  dogsRunning: '1548199973-03cce0bbc87b',
  pugYellow: '1517849845537-4d257902454a',
  frenchieShirt: '1583511655857-d19b40a7a54e',
  tabbySky: '1574158622682-e40e69881006',
  aussieBeach: '1587300003388-59208cc962cb',
  catDogCuddle: '1450778869180-41d0601e046e',
  kittenPaw: '1592194996308-7b43878e84a6',
  tollerBeach: '1530281700549-e82e7bf110d6',
  golden: '1558788353-f76d92427f16',
  kibbleBowl: '1589924691995-400dc9ecc119',
  biscuits: '1568640347023-a616a30bc3bd',
  dogReading: '1535930891776-0c2dfb7fda1a',
  jackRussell: '1561037404-61cd46aa615b',
  catBlanket: '1494256997604-768d1f608cac',
  orangeCat: '1596854407944-bf87f6fdd49e',
  puppySunset: '1576201836106-db1758fd1c97',
  corgiOrange: '1537151625747-768eb6cf92b2',
  cockerGrass: '1588943211346-0908a1fb0b01',
  puppyBowl: '1507146426996-ef05306b995a',
  goldenFlower: '1552053831-71594a27632d',
  aussiePuppies: '1525253086316-d0c936c814f8',
  highFive: '1415369629372-26f2fe60c467',
  goldenBath: '1516734212186-a967f81ad0d7',
  samoyed: '1529429617124-95b109e86bb8',
  frenchieHoodie: '1583337130417-3346a1be7dee',
  schnauzerGlasses: '1591769225440-811ad7d6eab3',
  corgiHearts: '1612536057832-2ff7ead58194',
  catDogGrass: '1623387641168-d9803ddd3f35',
  schnauzerYellow: '1625316708582-7c38734be31d',
  shihTzu: '1608096299210-db7e38487075',
  dogSelfie: '1615751072497-5f5169febe17',
  labCollar: '1586671267731-da2cf3ceeb80',
  kitten: '1595433707802-6b2626ef1c91',
  basketBed: '1600369671236-e74521d4b6ad',
  guineaPigs: '1548767797-d8c844163c4c',
  catPetted: '1513360371669-4adf3dd7dff8',
  catSleeping: '1511044568932-338cba0ad803',
  catSunglasses: '1533738363-b7f9aef128ce',
  whiteCat: '1606214174585-fe31582dc6ee',
  dogBed: '1581888227599-779811939961',
  womanDog: '1604848698030-c434ba08ece1',
} as const

export type Pic = keyof typeof UNSPLASH

/** pics.beagle === 'beagle' — names of the local photos. */
export const pics = Object.fromEntries(Object.keys(UNSPLASH).map((k) => [k, k])) as { [K in Pic]: K }

/**
 * Local photo from public/images/pets, already cropped to the size each
 * section uses (file name: <pic>-<w>x<h>.webp, or <pic>-<w>.webp).
 */
export const photo = (pic: Pic, w: number, h?: number) => `/images/pets/${pic}-${h ? `${w}x${h}` : w}.webp`
