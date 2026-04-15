import * as THREE from 'three'
import { TextureLoader } from 'three';
import {
    floorColorTextureLoader,
    floorNorTextureLoader,
    floorArmTextureLoader
} from '../../load/texturesLoad/floorTextureLoad'
export async function createFloorGeometry(textureLoader: TextureLoader) {
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    //设置使用第二套UV
    floorGeometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(floorGeometry.attributes.uv.array, 2)
    )

    const [armTexture, colorTexture, norTexture] = await Promise.all([
        floorArmTextureLoader(textureLoader),
        floorColorTextureLoader(textureLoader),
        floorNorTextureLoader(textureLoader)
    ])

    colorTexture.colorSpace = THREE.SRGBColorSpace;
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: norTexture,
        aoMap: armTexture,
        roughnessMap: armTexture,
        metalnessMap: armTexture,
        roughness: 1,
        metalness: 1,
        side: THREE.DoubleSide,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.scale.set(0.2, 0.2, 1);
    floor.position.y = -1;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    return floor;
}

