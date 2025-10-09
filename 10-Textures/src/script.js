import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/*
Notes:
- textures on the geometry
- color or albedo
	- applied on geometry
- alpha: gray scale image, white is visible
- height/displacement grayscale image
	- white, vertices will go up
	- black will go down
	- verticies will move up or down depending on the texture
	- need enough subdivisions
- normal: adds details doens't need subdivision
	- see the details for light
	- better performances, no subdivisions, simple plane.
	- vertices won't move. it will still be a plane
- ambient occlusion
	- add details and contrast
	- faking shadows
- metalness
	- white = metallic black: not
	-mostly for reflection
- roughness
	- gray scale image
	- works with metalness
	- light dissipation, light bounce keep it precise
	- gray makes it varnish
- create all the textures you want
PBR principles:
	- physically based rendering
	- algorithm calculation that follow real life, real life calculation
	- light bouncing how you light up a texture, get a realistic result
	- many softwares, engines and libraries are usuing
How to load Textures
- cannot use the texture outside of the function
- don't put it inside a callback function
UV Unwrapping
- how texture is placed on the geometry
- unwrapping origami
- uv coordinates are 2D, help position the coordinates on the geometry
- create your own geometry, you have to specify those coordinates set up inside the attributes
Transforming Textures
- offset, repeat wraping, mirrored repeat wrapping, rotate texture
Filtering and Mimapping
- technique, creates half smaller version of the texture again until you get a 1x1 texture
- texture gets sent to the gpu 1 texture
- gpu will use different version, based on what we see
- 2 types: 
	minification: pixels of the texture are smaller than the pixels of the render
	- huge texture that gets squeezed
	- change how the pixels are getting fetched
	- nearest filter, then they can merge them
	- dont' need mip mapping for nearest filter
	magnifiction: textue is not big enough, and pixels get stretched
	- won't know it's being stretched sharper

*/

/**Textures */
//hot texure loader works behind the scene
// const image = new Image() //create an empty image
// // const texture = new THREE.Texture(image) //image isn't even loaded, no javascript scope issue
// // texture.colorSpace = THREE.SRGBColorSpace
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace

// //have to tell the image has changed, update yourself
// image.onload = () => {
// 	//image is ready, how to use it on the cube
// 	//convert to texture, more gpu friendly
// 	texture.needsUpdate = true
// }

// image.src = '/textures/door/color.jpg'
//loading manager mutualize events (global loading progress or when everything is loaded)

const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
// 	console.log('on start')
// }
// loadingManager.onProgress = () => {
// 	console.log('on progress')
// }
// loadingManager.onError = () => {
// 	console.log('on error')
// }

const textureLoader = new THREE.TextureLoader(loadingManager) // less lines of code
// const colorTexture = textureLoader.load('/textures/door/color.jpg') //create 3 functions after the path
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
// alphaTexture.colorSpace = THREE.SRGBColorSpace
// heightTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI/4 // in radians
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter // better for performances
colorTexture.magFilter = THREE.NearestFilter


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()