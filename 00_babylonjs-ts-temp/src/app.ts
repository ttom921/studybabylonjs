import { ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
//import '../public/css/style.css'; // 使用 ESM 方式引入

class App {
    constructor() {
        //create ths canvas html element and attach it to the webpage
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "renderCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        let engine = new Engine(canvas, true);
        let scene = new Scene(engine);

        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        let sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        //hide/show the inspector
        window.addEventListener("keydown", (ev) => {
            //console.log("keydown ev=", ev);
            //shift+Ctrl+Alt+I
            if (ev.altKey && (ev.key === 'i' || ev.key === 'I')) {
                //console.log("keydown ev=", ev);
                if (Inspector.IsVisible) {
                    //scene.debugLayer.hide();
                    Inspector.Hide();
                } else {
                    //console.log("keydown ev=", ev);
                    //scene.debugLayer.show();
                    // Inspector.Show(scene, {
                    //     embedMode: true
                    //   });
                    Inspector.Show(scene, {});
                }
            }
        });

        //run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

    }
}
new App();
// import MyScene from "./my-scene";

// window.addEventListener('DOMContentLoaded', () => {
//     //create the game user the 'renderCanvas'.
//     let game = new MyScene('renderCanvas');

//     //create the scene
//     game.createScene();

//     //Start render loop
//     game.doRender();
// });
