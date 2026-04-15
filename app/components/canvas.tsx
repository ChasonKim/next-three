'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'
import { loadHamburger } from './modules/hamburger/hamburger'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './canvas.css'
import { handleResize } from './tools/tools'
import { hdrLoader } from './load/hdrLoad/hdrLoad'
import { createFloorGeometry } from './modules/floor/floor'

export default function Canvas() {
    const canvasRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const textureLoader = new TextureLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/gltf');
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        const gui = new GUI();
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            return
        }
        //get clinet width and heght

        const clinetWidth = canvasElement.clientWidth;
        const clientHeight = canvasElement.clientHeight;


        // new scene
        const scene = new THREE.Scene();
        // new camera
        const camera = new THREE.PerspectiveCamera(
            75,
            clinetWidth / clientHeight,
            0.01,
            1000
        );
        camera.position.z = 5;
        scene.add(camera);
        gui.add(camera.position, 'z').min(0).max(50).step(0.01);

        // new renderer
        const renderer = new THREE.WebGLRenderer(
            //抗锯齿
            {
                antialias: true
            }
        )

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(clinetWidth, clientHeight);
        canvasElement.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xfffffff, 5);
        scene.add(ambientLight);
        gui.add(ambientLight, 'intensity').min(0).max(10).step(0.01);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.05

        const render = () => {
            renderer.render(scene, camera);
        }

        // create geometry
        loadHamburger(gltfLoader).then((hamburger) => {
            scene.add(hamburger);
            render();
        })

        createFloorGeometry(textureLoader).then((floor) => {
            scene.add(floor);
        });

        const hdrlader = new HDRLoader();
        hdrLoader(hdrlader, scene);

        handleResize(canvasElement, camera, renderer, render);
        // const handleResize = () => {
        //     const width = canvasElement.clientWidth;
        //     const height = canvasElement.clientHeight;
        //     camera.aspect = width/height;
        //     camera.updateProjectionMatrix();
        //     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        //     renderer.setSize(width, height);
        //     render();
        // }

        const onResize = () => {
            handleResize(canvasElement, camera, renderer, render);
        };

        window.addEventListener('resize', onResize);
        renderer.setAnimationLoop(render);

        return () => {
            window.removeEventListener('resize', onResize);
            renderer.setAnimationLoop(null);
            gui.destroy()
            dracoLoader.dispose()
            canvasElement.removeChild(renderer.domElement);
        }
    }, [])

    // useEffect(() => {
    //     const gui = new GUI();
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath('/draco/gltf/');
    //     const gltfLoader = new GLTFLoader();
    //     gltfLoader.setDRACOLoader(dracoLoader);
    //     const canvasElement = canvasRef.current; 
    //     if (!canvasElement) {
    //         return;
    //     }

    //     const clinetWidth = canvasElement.clientWidth;  
    //     const clientHeight = canvasElement.clientHeight;

    //     const scene = new THREE.Scene();

    //     const camera = new THREE.PerspectiveCamera(
    //         75, 
    //         clinetWidth/clientHeight, 
    //         0.1, 
    //         1000);

    //     camera.position.z = 5;
    //     gui.add(camera.position, 'z').min(0).max(10).step(0.01);
    //     scene.add(camera);
    //     const renderer = new THREE.WebGLRenderer( {
    //         antialias : true
    //     } );

    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2))
    //     renderer.setSize(clinetWidth,clientHeight)
    //     canvasElement.appendChild(renderer.domElement);

    //     const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
    //     scene.add(ambientLight);
    //     gui.add(ambientLight,'intensity').min(0).max(10).step(0.01);

    //     const render = () => {
    //         renderer.render(scene,camera)
    //     }

    //     loadHamburger(gltfLoader).then((hamburger) => {
    //         scene.add(hamburger);
    //         render();
    //     });

    //     const handleResize = () => {
    //         const width = canvasElement.clientWidth;
    //         const height = canvasElement.clientHeight;

    //         camera.aspect = width/height;
    //         camera.updateProjectionMatrix();
    //         renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    //         renderer.setSize(width,height);
    //         render();
    //     };

    //     window.addEventListener('resize',handleResize);
    //     renderer.setAnimationLoop(render);

    //     return () => {
    //         renderer.setAnimationLoop(null);
    //         window.removeEventListener('resize',handleResize);
    //         gui.destroy();
    //         dracoLoader.dispose();
    //         renderer.dispose();
    //         canvasElement.removeChild(renderer.domElement);
    //     }
    // },[]) ;

    return (
        <div id="canvas" ref={canvasRef} ></div>
    )
}
