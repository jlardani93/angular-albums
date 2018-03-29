import { Component } from '@angular/core';
import { gridFactory, Square } from '../models/grid.model';
import { player } from '../models/player.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  grid = gridFactory.createGrid(10,10);
  gameCounter: number = 1;
  renderCounter: number = 1;

  renderGridContainer = () => {
    this.renderCounter += 1;
    return {'position': 'relative', 'height': (this.grid.length*100) + 'px', 'width': (this.grid[0].length*100) + 'px', 'border': '2px solid black'};
  }

  produceAlien(){
    let randomY = Math.floor(Math.random()*(this.grid.length-1));
    let randomX = Math.floor(Math.random()*this.grid[0].length);
    this.grid[randomY][randomX].alien = true;

  }

  fireProjectile(){
    this.grid[player.y-1][player.x].player_projectile = true;
  }

  renderSquare(y, x){

    let myStyles = {}
    myStyles["position"] = 'absolute';
    myStyles["top"] = y*100 + 'px';
    myStyles["left"] = x*100 + 'px';
    myStyles["height"] = '100px';
    myStyles["width"] = '100px';
    myStyles["border"] = '1px solid black';
    if (y === player.y && x === player.x) {
      this.grid[y][x].player = true;
      myStyles['background-color'] = 'blue';
    }
    if (this.grid[y][x].player_projectile === true && this.grid[y][x].alien === true && this.renderCounter % 2 === 0){
      myStyles['background-color'] = 'white';
      this.grid[y][x].player_projectile === false;
      this.grid[y][x].alien === false;
      return myStyles;
    }
    if (this.grid[y][x].alien === true && this.renderCounter % 2 === 0) {
       myStyles['background-color'] = 'green';
    }
    if (this.grid[y][x].player_projectile === true && this.renderCounter % 2 === 0){
       myStyles['background-color'] = 'red';
       this.grid[y][x].player_projectile = false;
       if (y !== 0) this.grid[y-1][x].player_projectile = true;
    }
    return myStyles;
  }

  onKeyDown(event){
    this.produceAlien();

    if (event.key === "ArrowLeft" && player.x >= 1){
      player.x -= 1;
      this.gameCounter += 1;
    } else if (event.key === "ArrowRight" && player.x < 9){
      player.x += 1;
      this.gameCounter += 1;
    } else if (event.key === "ArrowUp"){
      this.fireProjectile();
      this.gameCounter += 1;
    }

  }
}
