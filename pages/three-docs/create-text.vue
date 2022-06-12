<template>
  <div class="xy-page">
    <div class="xy-page__inner">
      <section
        ref="canvasWrapRef"
        class="w-screen h-screen bg-red-100 xy-canvas__wrap"
      ></section>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  LineBasicMaterial,
  LineDashedMaterial,
  Vector3,
  BufferGeometry,
  Line,
} from "three";
import { mEventListener } from "~/utils/helpers/event";

export default {
  setup(props, context) {
    const canvasWrapRef = ref(null);
    let scene!: Scene;
    let camera!: PerspectiveCamera;
    let renderer!: WebGLRenderer;
    let line!: Line;

    const initScene = () => {
      scene = new Scene();
      camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      );
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      renderer = new WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasWrapRef.value?.appendChild(renderer.domElement);

      initLineMesh();
    };

    const initLineMesh = () => {
      // 对于线条来说，我们能使用的材质只有LineBasicMaterial 或者 LineDashedMaterial。
      //create a blue LineBasicMaterial
      // const material = new LineBasicMaterial( { color: 0x0000ff } );
      const material = new LineDashedMaterial({
        color: 0x00ffff,
        linewidth: 3,
        scale: 10,
        dashSize: 15,
        gapSize: 10,
      });

      // 创建一个带有一些顶点的geometry（几何体）
      // 注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条（线条并未闭合）。
      const points = [];
      points.push(new Vector3(-10, 0, 0));
      points.push(new Vector3(0, 10, 0));
      points.push(new Vector3(10, 0, 0));

      const geometry = new BufferGeometry().setFromPoints(points);

      line = new Line(geometry, material);

      scene.add(line);
      
      // LineDashedMaterial必须要调用了computeLineDistances方法才会有效果
      line.computeLineDistances();
    };

    const updateLine = () => {
      const rotateLine = () => {
        line.rotation.x += 0.01;
        line.rotation.y += 0.01;
      };

      rotateLine();
    };

    function animate() {
      requestAnimationFrame(animate);

      updateLine();

      renderer.render(scene, camera);
    }

    const onWindowResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      camera.aspect = screenWidth / screenHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(screenWidth, screenHeight);
    };

    const windowResizeMEL = new mEventListener("resize", onWindowResize, false);

    onMounted(() => {
      initScene();
      animate();

      windowResizeMEL.add();
    });

    onBeforeUnmount(() => {
      windowResizeMEL.remove();
    });

    return {
      canvasWrapRef,
    };
  },
};
</script>
