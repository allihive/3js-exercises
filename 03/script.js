import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl') //incase it fetches the wrong canvas

//scene
const scene = new THREE.Scene()

//object (mesh and camera are objects
const geometry = new THREE.BoxGeometry(1, 1, 1) //width heigh depth
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//sizes
const sizes = {
	width: 800,
	height: 600
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3//x, y, z
scene.add(camera) //add or get bugs

//renderer: take a picture of the scene drawn to canvas
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)