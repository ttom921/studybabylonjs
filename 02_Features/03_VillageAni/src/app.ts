import { ArcRotateCamera, Color3, DynamicTexture, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Sound, StandardMaterial, Texture, Tools, TransformNode, Vector3, Vector4 } from "@babylonjs/core";
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
        let camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        //
        const faceColors = [];
        faceColors[0] = Color3.Blue();
        faceColors[1] = Color3.Teal()
        faceColors[2] = Color3.Red();
        faceColors[3] = Color3.Purple();
        faceColors[4] = Color3.Green();
        faceColors[5] = Color3.Yellow();

        const boxParent = MeshBuilder.CreateBox("Box", { faceColors: faceColors });
        const boxChild = MeshBuilder.CreateBox("Box", { size: 0.5, faceColors: faceColors });
        boxChild.setParent(boxParent);

        boxChild.position.x = 0;
        boxChild.position.y = 2;
        boxChild.position.z = 0;

        boxChild.rotation.x = Math.PI / 4;
        boxChild.rotation.y = Math.PI / 4;
        boxChild.rotation.z = Math.PI / 4;

        boxParent.position.x = 2;
        boxParent.position.y = 0;
        boxParent.position.z = 0;

        boxParent.rotation.x = 0;
        boxParent.rotation.y = 0;
        boxParent.rotation.z = -Math.PI / 4;

        const boxChildAxes = this.localAxes(1, scene);
        boxChildAxes.parent = boxChild;
        this.showAxis(6, scene);

        return scene;

    }
    /***********Create and Draw Axes**************************************/
    private showAxis(size: number, scene: Scene) {
        const makeTextPlane = (text, color, size) => {
            const dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            const plane = Mesh.CreatePlane("TextPlane", size, scene, true);
            const stdMat = new StandardMaterial("TextPlaneMaterial", scene);
            stdMat.backFaceCulling = false;
            stdMat.specularColor = new Color3(0, 0, 0);
            stdMat.diffuseTexture = dynamicTexture;
            plane.material = stdMat;
            return plane;
        };

        const axisX = Mesh.CreateLines("axisX", [
            Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
            new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
        ], scene, true);
        axisX.color = new Color3(1, 0, 0);
        const xChar = makeTextPlane("X", "red", size / 10);
        xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

        const axisY = Mesh.CreateLines("axisY", [
            Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
            new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
        ], scene, true);
        axisY.color = new Color3(0, 1, 0);
        const yChar = makeTextPlane("Y", "green", size / 10);
        yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

        const axisZ = Mesh.CreateLines("axisZ", [
            Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
            new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
        ], scene, true);
        axisZ.color = new Color3(0, 0, 1);
        const zChar = makeTextPlane("Z", "blue", size / 10);
        zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);

    }
    /*******************************Local Axes****************************/
    private localAxes(size: number, scene: Scene) {
        const local_axisX = Mesh.CreateLines("local_axisX", [
            new Vector3(0, 0, 0), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
            new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
        ], scene, true);
        local_axisX.color = new Color3(1, 0, 0);

        const local_axisY = Mesh.CreateLines("local_axisY", [
            new Vector3(0, 0, 0), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
            new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
        ], scene, true);
        local_axisY.color = new Color3(0, 1, 0);

        const local_axisZ = Mesh.CreateLines("local_axisZ", [
            new Vector3(0, 0, 0), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
            new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
        ], scene, true);
        local_axisZ.color = new Color3(0, 0, 1);

        const local_origin = new TransformNode("local_origin");

        local_axisX.parent = local_origin;
        local_axisY.parent = local_origin;
        local_axisZ.parent = local_origin;

        return local_origin;
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
