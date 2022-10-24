// import css file
import './style.css'
// import threeJS and OrbitControls
import * as THREE from 'three'
import { TextureLoader } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
// gsap for animations
import dat from 'dat.gui'

// import textures
const textureLoader = new TextureLoader()
const particleTexture = textureLoader.load('textures/particle.png')

// target canvas to display 3d renderer
const CanvasContainer = document.getElementById('canvasContainer')

// creating scene
const scene = new THREE.Scene()

// sizes for 3d area
const sizes = {
    width : innerWidth,
    height : innerHeight
}

// resize trigger
window.addEventListener('resize', () => {
    // set new sizes
    sizes.width = innerWidth
    sizes.height = innerHeight
    // set camera new aspect ratio and update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    //set renderer new sizes and pixel ratio
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
})

// double click trigger
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        CanvasContainer.requestFullscreen()
    }
    else {
        document.exitFullscreen()
    }
})

// elements in the scene
const parameters = {}
parameters.count = 240000
parameters.size = 0.025
parameters.radius = 6.75
parameters.branches = 3
parameters.spin = 2.5
parameters.randomness = 0.25
parameters.randomnessPow = 4.5
parameters.insideColor = '#ff3c30'
parameters.outsideColor = '#1b7184'
parameters.speed = 0

let geometry = null
let material = null
let points = null
const generateGalaxy = () => {
    if(points != null){
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)
    for (let i = 0; i < parameters.count * 3; i++) {
        const radius = Math.random() * parameters.radius
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        const spinAngle = radius * parameters.spin

        const randomX = (Math.pow(Math.random(), parameters.randomnessPow)) * ( Math.random() < 0.5 ? 1 : -1) * parameters.randomness * parameters.radius
        const randomY = (Math.pow(Math.random(), parameters.randomnessPow)) * ( Math.random() < 0.5 ? 1 : -1) * parameters.randomness * parameters.radius
        const randomZ = (Math.pow(Math.random(), parameters.randomnessPow)) * ( Math.random() < 0.5 ? 1 : -1) * parameters.randomness * parameters.radius

        const i3 = i * 3
        positions[i3  ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3+1] = 0 + randomY
        positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )
    material = new THREE.PointsMaterial(
        {
            alphaMap: particleTexture,
            vertexColors: true,
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite:false,
            blending: THREE.AdditiveBlending
        }
    )
    points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateGalaxy()

// gui
const gui = new dat.GUI()
gui.add(parameters, 'count',1,500000,100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size',0.001, 0.1, 0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius',0.01, 20, 0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches', 1, 20, 1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness', 0, 1, 0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPow', 0, 10, 0.01).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
gui.add(parameters, 'speed', 0, 1, 0.01).onFinishChange(generateGalaxy)

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.z = 2
// pointLight.position.y = 3
// scene.add(ambientLight, pointLight)
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
camera.position.y = 10
scene.add(camera)

// OrbitControls
const controls = new OrbitControls(camera, CanvasContainer)
controls.enableDamping = true
controls.enableKeys = true

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
CanvasContainer.appendChild(renderer.domElement)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.render(scene, camera)

// Clock for get elapsedTime
const clock = new THREE.Clock()
// Clock for frame rate
let startTime = Date.now()
let skipClock = 5
const fps = document.getElementById("fps")




// animation loop
function animate(){
    // elapsedTime
    const elapsedTime = clock.getElapsedTime();

    // ....
    // animate start
    points.rotation.y = elapsedTime * parameters.speed

    //animate end
    // ....

    // display frame rate
    const currentTime = Date.now()
    if(skipClock >= 15){
        fps.innerHTML = Math.round(1000 / (currentTime - startTime))
        skipClock = 0
    }
    skipClock++
    startTime = currentTime

    controls.update()
    // render the scene
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}animate()
