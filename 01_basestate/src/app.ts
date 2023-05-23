import { ArcRotateCamera, Color4, Effect, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, Sound, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, Rectangle, Image, TextBlock, Control, Button } from "babylonjs-gui";


//enum for states

enum State { START, GAME, LOSE, CUTSCENE }
class App {
    // General Entire Application
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    //Scene - related
    private _state: State = State.START;

    //post process
    private _transition: boolean = false;

    constructor() {
        this._canvas = this._createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
        camera.attachControl(this._canvas, true);
        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);

        let sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this._scene);

        //hide/show the inspector
        window.addEventListener("keydown", (ev) => {
            //console.log("keydown ev=", ev);
            //shift+Ctrl+Alt+I
            if (ev.altKey && (ev.key === 'i' || ev.key === 'I')) {
                //console.log("keydown ev=", ev);
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    //console.log("keydown ev=", ev);
                    this._scene.debugLayer.show();
                }
            }
        });

        //run the main render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

    }

    // goToStart
    private async _goToStart() {
        //make sure to wait for start to load
        this._engine.displayLoadingUI();

        //--SCEN SETUP--
        //don't detect any inputs form this ui while the game is loading
        this._scene.detachControl();
        let scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        //creates and positions a free camera
        let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());//target the camera tho scene origin

        //--SOUND--
        const start = new Sound("startSong", "./public/sounds/copycat(revised).mp3", scene, () => {

        }, {
            volume: 0.25,
            loop: true,
            autoplay: true,
        });
        const sfx = new Sound("selection", "./public/sounds/vgmenuselect.wav", scene, () => { });

        //--GUI---
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        guiMenu.idealHeight = 720;

        //background image
        const imageRect = new Rectangle("titleContainer");
        imageRect.width = 0.0;
        imageRect.thickness = 0;
        guiMenu.addControl(imageRect);

        const startbg = new Image("startbg", "./pulic/sprites/start.jpeg");
        imageRect.addControl(startbg);

        const title = new TextBlock("title", "SUMMER's FESTIVAL");
        title.resizeToFit = true;
        title.fontFamily = "Ceviche One";
        title.fontSize = "64px";
        title.color = "white";
        title.top = "14px";
        title.width = 0.8;
        title.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        imageRect.addControl(title);

        const startBtn = Button.CreateSimpleButton("start", "PLAY");
        startBtn.fontFamily = "Viga";
        startBtn.width = 0.2
        startBtn.height = "40px";
        startBtn.color = "white";
        startBtn.top = "-14px";
        startBtn.thickness = 0;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        imageRect.addControl(startBtn);

        //set up transition effect:modified version of https://www.babylonjs-playground.com/#2FGYE8#0
        Effect.RegisterShader("fade",
            "precision highp float;" +
            "varying vec2 vUV;" +
            "uniform sampler2D textureSampler; " +
            "uniform float fadeLevel; " +
            "void main(void){" +
            "vec4 baseColor = texture2D(textureSampler, vUV) * fadeLevel;" +
            "baseColor.a = 1.0;" +
            "gl_FragColor = baseColor;" +
            "}");

        let fadeLevel = 1.0;
        this._transition = false;
        scene.registerBeforeRender(() => {
            if (this._transition) {
                fadeLevel -= .05;
                if (fadeLevel <= 0) {
                    this._goToCutScene();
                    this._transition = false;
                }
            }
        });

        //--SCENE FINISHED LOADING--
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI(); //when the scene is ready, hide loading
        //lastly set the current state to the start state and set the scene to the start scene
        this._scene.dispose();
        this._scene = scene;
        this._state = State.START;

    }
    private async _goToCutScene(): Promise<void> {

    }
    private async _goToLose(): Promise<void> {
        this._engine.displayLoadingUI();

        //--SCENE SETUP--
        this._scene.detachControl();
        let scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        let camera = new FreeCamera("camsera1", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        ///--GUI--
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const mainBtn = Button.CreateSimpleButton("mainmenu", "MAIN MENU");
        mainBtn.width = 0.2;
        mainBtn.height = "40px";
        mainBtn.color = "white";
        guiMenu.addControl(mainBtn);
        //this handles interactions with the start button attached to the scene
        mainBtn.onPointerUpObservable.add(() => {
            this._goToStart();
        });

        //--SCENE FINISHED LOADING--
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        //lastly set the current state to the lose state and set the scene to the lose scene
        this._scene.dispose();
        this._scene = scene;
        this._state = State.LOSE;
    }
    private _createCanvas() {
        //Commented out for development
        // document.documentElement.style["overflow"] = "hidden";
        // document.documentElement.style.overflow = "hidden";
        // document.documentElement.style.width = "100%";
        // document.documentElement.style.height = "100%";
        // document.documentElement.style.margin = "0";
        // document.documentElement.style.padding = "0";
        // document.body.style.overflow = "hidden";
        // document.body.style.width = "100%";
        // document.body.style.height = "100%";
        // document.body.style.margin = "0";
        // document.body.style.padding = "0";

        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
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
