import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { transformMesh } from "@/utils/transfromMeshIntoParticles";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    Hj__rna3_1: THREE.MeshStandardMaterial;
  };
};

export function Earth(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/logoOne.glb") as GLTFResult;

  useEffect(() => {
    let sampler: MeshSurfaceSampler | undefined;

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        sampler = new MeshSurfaceSampler(obj as any).build();
      }
    });

    transformMesh(sampler!, group.current!);
  }, [scene]);

  return <group ref={group} {...props} />;
}

useGLTF.preload("/logoOne.glb");
