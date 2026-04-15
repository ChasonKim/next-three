import * as THREE from 'three'

export const handleResize = (
            canvasElement : any,
            camera : THREE.PerspectiveCamera,
            renderer : THREE.WebGLRenderer,
            render : any
        ) => {
            const width = canvasElement.clientWidth;
            const height = canvasElement.clientHeight;
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
            renderer.setSize(width, height);
            render();
        }

