import { ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
//import '../public/css/style.css'; // 使用 ESM 方式引入

class App {
    constructor() {   //create ths canvas html element and attach it to the webpage
        let canvas = this._createCanvas();

        // initialize babylon scene and engine
        let engine = new Engine(canvas, true);
        let scene = this.loadMultipleModelModify(canvas, engine);

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
    private loadMultipleModelModify(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        SceneLoader.ImportMeshAsync("", "meshes/", "both_houses_scene.babylon", scene).then((result) => {
            //console.log("scene=", scene);
            //console.log("result=", result);
            const house1 = scene.getMeshByName("detached_house");
            house1.position.y = 2;
            const house2 = result.meshes[2];
            console.log(house2.name);
            house2.position.y = 1;
        });
        return scene;
    }
    private loadMultipleModelOnce(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        SceneLoader.ImportMeshAsync(["ground", "semi_house"], "meshes/", "both_houses_scene.babylon", scene);
        return scene;
    }
    private loadFirstModel(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        SceneLoader.ImportMeshAsync("semi_house", "meshes/", "both_houses_scene.babylon", scene);
        return scene;

    }
    private playground01(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 3, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        const box = MeshBuilder.CreateBox("box", {}, scene);
        return scene;
    }
    private _createCanvas() {
        //create ths canvas html element and attach it to the webpage
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "renderCanvas";
        document.body.appendChild(canvas);
        return canvas;
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
