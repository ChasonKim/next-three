import { Texture, TextureLoader } from "three";


//添加地板颜色贴图
export const floorColorTextureLoader = (
    textureLoader : TextureLoader
) => {
    return new Promise<Texture>((resolve,reject) => {
        textureLoader.load(
            '/static/textures/floor/stained_pine_diff_1k.jpg',
            (texture) => resolve(texture),
            undefined,
            reject
        )
    }) 
}

//添加地板法线贴图
export const floorNorTextureLoader = () => {
    
}