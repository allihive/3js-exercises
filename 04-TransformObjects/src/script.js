import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 'blue' })
// const mesh = new THREE.Mesh(geometry, material)
// //y up, x right, z back default 1 is arbitrary (meter, kilometer and stick to it)
// //position is a vector3. lots of methods
// // mesh.position.x = -2
// // mesh.position.y = - 0.6
// // mesh.position.z = 0.5
// mesh.position.set(0.7, -0.6, 1)
// scene.add(mesh)

// // mesh.position.normalize()
// // console.log(mesh.position.length()) //length: center of the scene and the object's position

// //Scale
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 2
// mesh.scale.set(2, 0.5, 0.5)

// //Rotation Euler
// mesh.rotation.reorder('YXZ') //help fix gimbal lock
// mesh.rotation.x = Math.PI * 0.25 //Euler not a vector specifically for rotation pi half a rotation
// mesh.rotation.y = Math.PI * 0.25 //gimbal lock if because you're stuck with an axis can change the order (FPS y first then x)

//Quaternion
	//hard to imagine, update quaternion can update rotation
	//provided

//Create a group, scale a group and do animation
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

//Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({color: 'red'})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({color: 'green'})
)
cube2.position.set(-2, 0, 0)
group.add(cube2)

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({color: 'blue'})
)
cube3.position.set(2, 0, 0)
group.add(cube3)

/**
 * Sizes
*/
const sizes = {
	width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position) //orientate axis at the target
// console.log(mesh.position.distanceTo(camera.position)) //camera and the object



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)