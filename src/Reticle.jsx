import React, { useMemo } from "react";
import * as THREE from "three";

const SIZE = 0.01;

const Reticle = () => {
  const vertices = useMemo(
    () =>
      [
        [0, SIZE, 0],
        [0, -SIZE, 0],
        [0, 0, 0],
        [SIZE, 0, 0],
        [-SIZE, 0, 0],
      ].map((v) => new THREE.Vector3(...v)),
    []
  );

  return (
    <line>
      <geometry vertices={vertices} />
      <lineBasicMaterial color={'black'} />
    </line>
  );
};

export default Reticle;
