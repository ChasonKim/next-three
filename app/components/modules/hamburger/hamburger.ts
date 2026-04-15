import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

export function loadHamburger (glfLoader: GLTFLoader) { 
    return new Promise<THREE.Group>( (resolve, reject)=> {
        glfLoader.load(
            '/static/models/hamburger.glb', 
            (gltf)=> {
            resolve(gltf.scene)
        }),
        undefined,
        reject
    })
}
