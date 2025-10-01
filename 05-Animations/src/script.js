import './style.css'
import * as THREE from 'three'

//Frame per second frame rate 60
//requestAnimationFrame is to call the function provided on the next frame

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()

//CLock
const clock = new THREE.Clock()

//Animations
const tick = () => {
	//adapt to frame rate
	// const currentTime = Date.now()
	// const deltaTime = currentTime - time
	// time = currentTime
	//don't do get Delta don't use it

	//update objects
	// mesh.rotation.y -= 0.002 * deltaTime //rotating at the same speed depending on the time rate

	//Clock
	const elapsedTime = clock.getElapsedTime()
	mesh.position.y = Math.cos(elapsedTime)
	mesh.position.x = Math.sin(elapsedTime)
	mesh.rotation.x += 0.01
	
	//render
	renderer.render(scene, camera)
	window. requestAnimationFrame(tick)
}
tick() //call it at the end or else it doesn't work