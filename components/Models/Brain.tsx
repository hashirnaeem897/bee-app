import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { transformMesh } from "@/utils/transfromMeshIntoParticles";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    Hj__rna3_1: THREE.MeshStandardMaterial;
  };
};

export function Brain(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/logoTwo.glb") as GLTFResult;
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    let sampler: MeshSurfaceSampler | undefined;

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        sampler = new MeshSurfaceSampler(obj as any).build();
      }
    });

    transformMesh(sampler!, group.current!);
  }, [scene]);

  return <group ref={group} {...props} dispose={null} />;
}

useGLTF.preload("/logoTwo.glb");
