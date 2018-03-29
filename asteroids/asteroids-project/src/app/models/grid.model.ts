export class Square {
  constructor(){};
  player: boolean = false;
  alien: boolean = false;
  player_projectile: boolean = false;
  alien_projective: boolean = false;
}

export let gridFactory = {
  createGrid: function(width, height){
    let gridArray = [];
    for (let i = 0; i < height; i++){
      gridArray.push([]); 
      for (let j = 0; j < width; j++){
        gridArray[i].push({
          player: false,
          alien: false,
          player_projectile: false,
          alien_projective: false
        });
      }
    }
    return gridArray;
  }
}
