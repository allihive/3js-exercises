import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//different cameras: cube camera (environment), stereo camera (3D), orthographic (without perspective)
//perspective camera
//built in controls for camera, except transform & drag controls (create an editor)

/**
 * Cursor
 */

const cursor = {
	x: 0,
	y: 0
}
window.addEventListener('mousemove', (event) => {
	cursor.x = -(event.clientX / sizes.width - 0.5) //0 - 1 as much left as the right
	cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) //parameters(FOV vertical part), aspect ratio, near and far
// how close and how far the camera can see between visible and not visible
//don't use extreme values 0.0001 and 9999999 prevent z-fighting and glitching

//orthographic camera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100) //left right, top, bottom, near, far. parallel renders
//square render (-1, 1, 1, 1) but render is not a square so you have to calculate the aspect ratio


// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas) //camera and DOM element for mouse movements
controls.enableDamping = true
// damping remember to update in the animation loop
//when to use controls vs when to do it yourself

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

	//Update camera
	// camera.position.x = cursor.x * 3 // this puts the camera in 1 position
	// camera.position.y = cursor.y * 3
	// camera.lookAt(mesh.position)

	//get the camera to go all the way around the cube x & z
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
	// camera.position.y = cursor.y * 5
	// camera.lookAt(mesh.position)

	//update controls
	controls.update() //update on each frame

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()