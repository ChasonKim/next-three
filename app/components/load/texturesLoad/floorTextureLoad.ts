import { Texture, TextureLoader } from "three";


//添加地板颜色贴图
export const floorColorTextureLoader = (
    textureLoader: TextureLoader
) => {
    return new Promise<Texture>((resolve, reject) => {
        textureLoader.load(
            '/static/textures/floor/stained_pine_diff_1k.jpg',
            (texture) => resolve(texture),
            undefined,
            reject
        )
    })
}

//添加地板法线贴图
export const floorNorTextureLoader = (
    textureLoader: TextureLoader
) => {
    return new Promise<Texture>((resolve, reject) => {
        textureLoader.load(
            '/static/textures/floor/stained_pine_nor_gl_1k.png',
            (texture) => resolve(texture),
            undefined,
            reject
        )
    })
}

//添加arm贴图
export const floorArmTextureLoader = (textureLoader: TextureLoader) => {
    return new Promise<Texture>((resolve, reject) => {
        textureLoader.load(
            '/static/textures/floor/stained_pine_arm_1k.jpg',
            (texture) => resolve(texture),
            undefined,
            reject
        )
    })
}