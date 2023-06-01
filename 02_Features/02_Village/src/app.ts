import { ArcRotateCamera, Color3, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Sound, StandardMaterial, Texture, Tools, Vector3, Vector4 } from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
//import '../public/css/style.css'; // 使用 ESM 方式引入

class App {
    constructor() {   //create ths canvas html element and attach it to the webpage
        let canvas = this._createCanvas();

        // initialize babylon scene and engine
        let engine = new Engine(canvas, true);
        let scene = this._createScene(canvas, engine);


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
        window.addEventListener("resize", () => {
            engine.resize();
        });

    }
    private _createScene(canvas: HTMLCanvasElement, engine: Engine) {
        /**** Set camera and light *****/
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        //
        const ground = this.buildGround(scene);
        const house = this.buildHouse(2); //width fo house 1 or 2
        // const box = this.buildBox(2);
        // const roof = this.buildRoof(scene);
        // //const house = Mesh.MergeMeshes([box, roof]);
        // const house = Mesh.MergeMeshes([box, roof], true, false, null, false, true);
        return scene;

    }
    private buildHouse(width: number = 2) {
        const box = this.buildBox(width);
        const roof = this.buildRoof(width);
        return Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    }
    private buildRoof(width: number = 2) {
        //texture
        const roofMat = new StandardMaterial("roofMat");
        roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg");
        //
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.scaling.y = width;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        return roof;
    }

    private buildBox(width: number = 2) {
        //texture
        const boxMat = new StandardMaterial("boxMat");
        if (width == 2) {
            boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/semihouse.png");
        } else {
            boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png");
        }
        //set uv
        const faceUV = [];
        if (width == 2) {
            faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
            faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
            faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
            faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
        } else {
            faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0);//rear side
            faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0);//front side
            faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0);//right side
            faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0);//left side
        }
        // top 4 and bottom 5 not seen so not set
        // world objects
        const box = MeshBuilder.CreateBox("box", { width: 2, faceUV: faceUV, wrap: true });
        box.material = boxMat;
        box.position.y = 0.5;
        return box;
    }

    private buildGround(scene: Scene) {
        // color 
        const groundMat = new StandardMaterial("groundMat");
        groundMat.diffuseColor = new Color3(0, 1, 0);
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        ground.material = groundMat;
        return ground;
    }
    private addBigHouse(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        // material
        // color 
        const groundMat = new StandardMaterial("groundMat");
        groundMat.diffuseColor = new Color3(0, 1, 0);

        //texture
        const roofMat = new StandardMaterial("roofMat");
        roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg");
        const boxMat = new StandardMaterial("boxMat");
        boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/semihouse.png")

        const faceUV = [];
        faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
        // top 4 and bottom 5 not seen so not set

        // world objects
        const box = MeshBuilder.CreateBox("box", { width: 2, faceUV: faceUV, wrap: true });
        box.material = boxMat;
        box.position.y = 0.5;
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.scaling.y = 2;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        ground.material = groundMat;
        return scene;

    }
    private addEachSize(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        // material
        // color 
        const groundMat = new StandardMaterial("groundMat");
        groundMat.diffuseColor = new Color3(0, 1, 0);

        //texture
        const roofMat = new StandardMaterial("roofMat");
        roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg");
        const boxMat = new StandardMaterial("boxMat");
        boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png")

        // options parameter to set different image on each side
        const faceUV = [];
        faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0);//rear side
        faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0);//front side
        faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0);//right side
        faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0);//left side
        //top 4 and bottom 5 not seen so nt set
        // world objects
        const box = MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true });
        box.material = boxMat;
        box.position.y = 0.5;
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        ground.material = groundMat;
        return scene;
    }
    private addTexture(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        // material
        // color 
        const groundMat = new StandardMaterial("groundMat");
        groundMat.diffuseColor = new Color3(0, 1, 0);

        //texture
        const roofMat = new StandardMaterial("roofMat");
        roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg");
        const boxMat = new StandardMaterial("boxMat");
        boxMat.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/floor.png")

        // world objects
        const box = MeshBuilder.CreateBox("box", {});
        box.material = boxMat;
        box.position.y = 0.5;
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        ground.material = groundMat;
        return scene;
    }
    private createRoofMesh(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        const box = MeshBuilder.CreateBox("box", {});
        box.position.y = 0.5;
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        return scene;

    }
    private createRotateMesh(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        const box = MeshBuilder.CreateBox("box", {});
        box.position.y = 0.5;
        //box.rotation.y = Math.PI / 4;
        box.rotation.y = Tools.ToRadians(45);
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        return scene;

    }
    private createPlaceNScaleMesh(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        let box1 = MeshBuilder.CreateBox("box1", { width: 2, height: 1.5, depth: 3 });
        box1.position.y = 0.75;

        const box2 = MeshBuilder.CreateBox("box2", {});
        box2.scaling.x = 2;
        box2.scaling.y = 1.5;
        box2.scaling.z = 3;
        box2.position = new Vector3(-3, 0.75, 0);

        const box3 = MeshBuilder.CreateBox("box3", {});
        box3.scaling = new Vector3(2, 1.5, 3);
        box3.position.x = 3;
        box3.position.y = 0.75;
        box3.position.z = 0;

        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        return scene;
    }
    private creatGroundWorld(canvas: HTMLCanvasElement, engine: Engine) {
        let scene = new Scene(engine);
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
        const box = MeshBuilder.CreateBox("box", {}, scene);
        box.position.y = 0.5;
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
        // // Load the sound adn play ite automatically once resay
        // const music = new Sound("cello", "sounds/cellolong.wav", scene, null, { loop: true, autoplay: true });
        // // Load the sound, give it time to load and play it every 3 seconds
        // const bounce = new Sound("bounce", "sounds/bounce.wav", scene);
        // setInterval(() => bounce.play(), 3000);
        return scene;
    }
    // private loadMultipleModelModify(canvas: HTMLCanvasElement, engine: Engine) {
    //     let scene = new Scene(engine);
    //     let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    //     camera.attachControl(canvas, true);
    //     let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    //     SceneLoader.ImportMeshAsync("", "meshes/", "both_houses_scene.babylon", scene).then((result) => {
    //         //console.log("scene=", scene);
    //         //console.log("result=", result);
    //         const house1 = scene.getMeshByName("detached_house");
    //         house1.position.y = 2;
    //         const house2 = result.meshes[2];
    //         console.log(house2.name);
    //         house2.position.y = 1;
    //     });
    //     return scene;
    // }
    // private loadMultipleModelOnce(canvas: HTMLCanvasElement, engine: Engine) {
    //     let scene = new Scene(engine);
    //     let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    //     camera.attachControl(canvas, true);
    //     let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    //     SceneLoader.ImportMeshAsync(["ground", "semi_house"], "meshes/", "both_houses_scene.babylon", scene);
    //     return scene;
    // }
    // private loadFirstModel(canvas: HTMLCanvasElement, engine: Engine) {
    //     let scene = new Scene(engine);
    //     let camera: ArcRotateCamera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
    //     camera.attachControl(canvas, true);
    //     let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    //     SceneLoader.ImportMeshAsync("semi_house", "meshes/", "both_houses_scene.babylon", scene);
    //     return scene;

    // }

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
