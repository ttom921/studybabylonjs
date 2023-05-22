
import MyScene from "./my-scene";

window.addEventListener('DOMContentLoaded', () => {
    //create the game user the 'renderCanvas'.
    let game = new MyScene('renderCanvas');

    //create the scene
    game.createScene();

    //Start render loop
    game.doRender();
});
