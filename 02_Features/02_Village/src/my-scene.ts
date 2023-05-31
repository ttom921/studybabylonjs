import * as BABYLON from '@babel/core'

export default class MyScene {
    private _canvas: HTMLCanvasElement;
    private _enginge: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement: string) {
        //create canvas and engins.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._enginge = new BABYLON.Engine(this._canvas, true);
    }

    createScene() {
        // careate a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._enginge);

        //create a Freecamera, and set it's position to (s:0,yL5,z:-10)
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);

        //Target the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        //attach the camera to the canvas.
        this._camera.attachControl(this._camera, false);

        //create a basic light, aiming 0,1,0 - meaning to th sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        //create a built-in "sphere" shape; with 16 segments adn diameter of 2.
        let sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, this._scene);

        //Move the sphere upward 1/2 of it's height.
        sphere.position.y = 1;

        //create a build-in "ground" shape.
        let ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, this._scene);

    }
    doRender() {
        //Run the render loop
        this._enginge.runRenderLoop(() => {
            this._scene.render();
        });

        //the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._enginge.resize();
        });
    }
}