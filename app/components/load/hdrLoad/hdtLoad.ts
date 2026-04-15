import * as THREE from 'three'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'


export const hdrLoader = (
    hdrLoad : HDRLoader,
    scene : THREE.Scene
) => {
    hdrLoad.load(
        '/static/hdr/suburban_garden_1k.hdr',
        (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = texture;
        }
    )
}