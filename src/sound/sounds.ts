import { Howl } from "howler";

export const music = new Howl({
  src: ["/assets/sounds/music.mp3"],
  volume: 0.05,
  loop: true,
});
// export const flipSound = new Audio("/assets/sounds/flip.mp3");
export const flipSound = new Howl({
  src: ["/assets/sounds/flip.mp3"],
  volume: 0.5,
});
export const correctSound = new Howl({
  src: ["/assets/sounds/correct.mp3"],
  volume: 0.5,
});
export const victorySound = new Howl({
  src: ["/assets/sounds/victory.mp3"],
  volume: 0.5,
});
