import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { PointerLockControls, PerspectiveCamera } from "@react-three/drei";
import Reticle from "./Reticle";
import "./styles.css";
import Box from "./Box";
import { Vector3 } from "three";

function App() {
  const controlsRef = useRef();
  const isLocked = useRef(false);

  return (
    <Canvas
      // Remove this to see the unexpected behavior without setting the offsets.
      // raycaster={{
      //   computeOffsets: (_, { size: { width, height } }) => {
      //     if (isLocked.current) {
      //       return ({
      //         offsetX: width / 2,
      //         offsetY: height / 2
      //       })
      //     } else {
      //       return null;
      //     }
      //   }
      // }}
    >
      <Camera />
      <MouseReticle />
      <PointerLockControls
        onUpdate={() => {
          if (controlsRef.current) {
            controlsRef.current.addEventListener('lock', () => {
              console.log('lock');
              isLocked.current = true
            });
            controlsRef.current.addEventListener('unlock', () => {
              console.log('unlock')
              isLocked.current = false;
            });
          }
        }}
        ref={controlsRef}
      />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />

    </Canvas>
  );
}


function Camera() {
  const mouseReticle = useRef();
  const { camera, mouse } = useThree();
  // initialize camera to look at origin.
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <PerspectiveCamera makeDefault position={[0, 5, 5]} near={0.1} far={10}>
      {/* This reticle lives where the camera is pointing. 
          This would be used in a first person environment */}
      <group position={[0, 0, -1]}>
        <Reticle />
      </group>
    </PerspectiveCamera>
  );
}

// Project a reticle of the mouse position onto the near plane.
// A little janky because the rotation is off, so it gets cut.
function MouseReticle() {
  const { camera, mouse } = useThree();
  const mouseReticle = useRef();

  useFrame(() => {
    if (mouseReticle.current) {
      const vector = new Vector3(mouse.x, mouse.y, -0.8).unproject(camera);
      mouseReticle.current.position.set(...vector.toArray());
    }
  })

  return (
    <mesh ref={mouseReticle}>
      <sphereBufferGeometry args={[0.001, 100, 100]} />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);