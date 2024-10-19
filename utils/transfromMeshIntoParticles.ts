import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as THREE from "three";

export const transformMesh = (
  sampler: MeshSurfaceSampler,
  scene: THREE.Group
) => {
  let pointsGeometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const tempPosition = new THREE.Vector3();

  for (let i = 0; i < 5000; i++) {
    sampler.sample(tempPosition);
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  }

  pointsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xf67b29,
    size: 0.1,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    sizeAttenuation: true,
    alphaMap: new THREE.TextureLoader().load("/particle-texture.jpg"),
  });

  pointsMaterial.onBeforeCompile = function (shader) {
    shader.vertexShader = `
          uniform vec3 mousePos;
          varying float vNormal;
  
  ${shader.vertexShader}`.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>   
         vec3 seg = position - mousePos;
         vec3 dir = normalize(seg);
         float dist = length(seg);
         if (dist < 1.5){
           float force = clamp(1.0 / (dist * dist), -0., .5);
           vNormal = force /0.5;
         }
  `
    );
  };

  const points = new THREE.Points(pointsGeometry, pointsMaterial);

  scene.add(points);
};

// transformed += dir * force;
