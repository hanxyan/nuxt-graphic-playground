<template>
  <div class="xy-page">
    <div class="xy-page__inner">
      <section ref="canvasWrapRef" class="w-screen h-screen bg-red-100 xy-canvas__wrap"></section>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'

export default {
  setup(props, context) {
    const canvasWrapRef = ref(null);
    let scene!: Scene
    let camera!: PerspectiveCamera
    let renderer!: WebGLRenderer
    let cube!: Mesh

    const initScene = () => {
      scene = new Scene()
      camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
      camera.position.z = 200;
      renderer = new WebGLRenderer()
      renderer.setSize( window.innerWidth, window.innerHeight )
      canvasWrapRef.value?.appendChild( renderer.domElement );

      initCubeMesh()
    }

    const initCubeMesh = () => {
      const geometry = new BoxGeometry( 100, 100, 100 );
      const material = new MeshBasicMaterial( { color: 0x00ff00 } );
      cube = new Mesh( geometry, material );
      scene.add( cube );
    }

    const updateCube = () => {

      const rotateCube = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }

      rotateCube()
    }

    function animate() {
      requestAnimationFrame( animate );

      updateCube()

      renderer.render( scene, camera );
    }

    onMounted(() => {
      initScene()
      animate()
    })

    return {
      canvasWrapRef
    };
  },
};
</script>
