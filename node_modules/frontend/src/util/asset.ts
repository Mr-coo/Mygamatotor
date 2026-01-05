import Background from '../assets/backgrounds/blue-tile.jpg'
import Wendy from '../assets/splash-screen/wendy.png'
import Tang from '../assets/cats/taNG_cat.png'
import Food from '../assets/cat-print.png'
import Ball from '../assets/ball.png'

const textures : Map<string, string> = new Map([
    ['background', Background],
    ['wendy', Wendy],
    ['tang', Tang],
    ['ball', Ball],
    ['food', Food]
])

const imageCache = new Map<string, HTMLImageElement>();

export function getImage(textureId: string): HTMLImageElement {
  let img = imageCache.get(textureId);
  if (!img) {
    const src = textures.get(textureId);
    if (!src) throw new Error(`Missing texture: ${textureId}`);

    img = new Image();
    img.src = src;
    imageCache.set(textureId, img);
  }
  return img;
}