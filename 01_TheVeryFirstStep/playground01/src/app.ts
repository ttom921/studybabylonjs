import { ArcRotateCamera, Color3, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3, Tools } from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';

//import '../public/css/style.css'; // 使用 ESM 方式引入
class App {
    //private _canvas: HTMLCanvasElement;
    constructor() {
        let canvas = this._createCanvas();

        // initialize babylon scene and engine
        let engine = new Engine(canvas, true);
        let scene = this.playground05(engine, canvas);
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
    private playground05(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", Tools.ToRadians(90), Tools.ToRadians(90), 10, Vector3.Zero(), scene);

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // oure buil-in 'ground' shapr.
        let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        let groundMaterial = new StandardMaterial("Ground Material", scene);
        let groundTexture = new Texture("texture/checkerboard_basecolor.png", scene);
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;
        SceneLoader.ImportMesh("", "meshes/Yeti/", "Yeti.gltf", scene, (newMeshes) => {
            newMeshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        });
        return scene;
    }
    private playground04(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // oure buil-in 'ground' shapr.
        let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        let groundMaterial = new StandardMaterial("Ground Material", scene);
        let groundTexture = new Texture("texture/checkerboard_basecolor.png", scene);
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;
        SceneLoader.ImportMesh("", "meshes/Yeti/", "Yeti.gltf", scene, (newMeshes) => {
            newMeshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        });
        return scene;

    }
    private playground03(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // oure buil-in 'ground' shapr.
        let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        let groundMaterial = new StandardMaterial("Ground Material", scene);
        let groundTexture = new Texture("texture/checkerboard_basecolor.png", scene);
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;

        return scene;

    }
    private playground02(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // oure buil-in 'ground' shapr.
        let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        let groundMaterial = new StandardMaterial("Ground Material", scene);
        groundMaterial.diffuseColor = Color3.Red();
        ground.material = groundMaterial;

        return scene;
    }
    private playground01(engine: Engine, canvas: HTMLCanvasElement) {

        let scene = new Scene(engine);
        let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // oure buil-in 'ground' shapr.
        let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        let groundMaterial = new StandardMaterial("Ground Material", scene);
        // groundMaterial.diffuseColor = Color3.Red();
        // ground.material = groundMaterial;

        let groundTexture = new Texture("img/amiga.jpg", scene);
        groundMaterial.diffuseTexture = groundTexture;
        ground.material = groundMaterial;


        // Our built-in 'sphere' shape.
        // let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
        // // Move the sphere upward 1/2 its height
        // sphere.position.y = 1;

        //U https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/ 

        // SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/BabylonJS/MeshesLibrary/master/", "PBR_Spheres.glb", scene, (newMeshes) => {

        // });
        // SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/BabylonJS/MeshesLibrary/master/", "Yeti.glb", scene, (newMeshes) => {
        //     newMeshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        // });
        return scene;
    }
    private _createCanvas() {
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
