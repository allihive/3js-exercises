import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from  'lil-gui'

/*
Notes:
debug UI:
lil-gui library popular, well maintained and easy to use
import * as dat from 'lil-gui'
tweaks: range, color, text, checkbox, select, button
only twek properties of objects
- add tweaks as you progress
*/

/*Debug */
const gui = new GUI({
	width: 340,
	title: 'Nice debug UI',
	closeFolders: false
})
// gui.close()
// gui.hide()

window.addEventListener('keydown', (event) => {
	if (event.key == 'h')
	{
		gui.show(gui._hidden)
	}
})
const debugObject = {}

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

debugObject.color = '#3a6ea6'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui
	.addFolder('Awesome')
cubeTweaks.close()

/*Range*/
// gui.add(mesh.position, 'y', -3, 3, 0.01) //object, then the property, min, max, position
cubeTweaks
	.add(mesh.position, 'y')
	.min(-3)
	.max(3)
	.step(0.01) //don't have to check the documentation
	.name('elevation')

//create an object whose purpose is to hold properties

/*checkbox for debug UI booleans*/
cubeTweaks
	.add(mesh, 'visible')
cubeTweaks
	.add(material, 'wireframe')

/*Colors*/
cubeTweaks.addColor(debugObject, 'color')
	.onChange(() => {
		material.color.set(debugObject.color)
	}) //applies color management not the same value used inside 3js
//retrieve what three.js is using internally

//animate the object button
debugObject.spin = () => {
	gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2})
}

cubeTweaks.add(debugObject, 'spin')

/*Tweak geometry*/
//make the wireframe true in the materials
//width height and depth dimensions

// cubeTweaks.add(geometry, 'widthsegments') //used to generate the whole geometry only once
//need to add subdivision property to the debug object
debugObject.subdivision = 2 // destroy old geometry and build a new one
cubeTweaks
	.add(debugObject, 'subdivision')
	.min(1)
	.max(20)
	.step(1)
	.onFinishChange(() => {
		mesh.geometry.dispose()
		mesh.geometry= new THREE.BoxGeometry(
			1, 1, 1,
			debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
	})
	//onFinishchange helps the CPU, when you release the click then it wil apply the change
	//old geometries are sitting somewhere in the GPU memory -> memory leak




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
camera.position.z = 2
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