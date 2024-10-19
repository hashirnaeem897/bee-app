import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Earth } from "./Earth";
import OurInvestor from "../OurInvestor/OurInvestor";
import { Brain } from "./Brain";
import Content from "../Content/Content";
import CardGridOne from "../CardGridOne/CardGridOne";
import CardGridTwo from "../CardGridTwo/CardGridTwo";

type GLTFResult = GLTF & {
  nodes: {
    Plane_1: THREE.Mesh;
    Plane_2: THREE.Mesh;
    Plane002: THREE.Mesh;
    Circle008: THREE.Mesh;
    Circle008_1: THREE.Mesh;
    Circle008_2: THREE.Mesh;
    Circle008_3: THREE.Mesh;
    Circle008_4: THREE.Mesh;
    Circle008_5: THREE.Mesh;
    Circle008_6: THREE.Mesh;
    Circle007: THREE.Mesh;
    Circle007_1: THREE.Mesh;
    Circle007_2: THREE.Mesh;
    Circle007_3: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.013"]: THREE.MeshStandardMaterial;
    ["Material.012"]: THREE.MeshStandardMaterial;
    ["Material.014"]: THREE.MeshStandardMaterial;
    ["Material.015"]: THREE.MeshStandardMaterial;
    ["Material.016"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Plane"
  | "Plane.002"
  | "Circle.009Action"
  | "KeyAction.003"
  | "Circle.006Action.002";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
export function BeeAnime(
  props: JSX.IntrinsicElements["group"] & {
    backgroundRef: React.RefObject<HTMLDivElement>;
  }
) {
  //references
  const htmlContent = useRef<THREE.Group>(null);
  const htmlContentTwo = useRef<THREE.Group>(null);
  const htmlContentThree = useRef<THREE.Group>(null);
  const htmlContentFour = useRef<THREE.Group>(null);
  const text = useRef<THREE.Group>(null);
  const beeRef = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);

  // //responsive breakpoint
  // const isMobile = window.innerWidth < 600;

  //glb animation mixer
  const { nodes, materials, animations } = useGLTF(
    "/beeAnime.glb"
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations, group);

  const [isParticlesPlay, setIsParticlesPlay] = useState<boolean>(false);
  useEffect(() => {
    if (isParticlesPlay) {
      actions["KeyAction.003"]!.paused = false;
    } else {
      actions["KeyAction.003"]!.play().setDuration(5);
      // .setLoop(THREE.LoopOnce, 1);
      actions["KeyAction.003"]!.clampWhenFinished = true;
      actions["KeyAction.003"]!.paused = true;
    }
  }, [isParticlesPlay, actions]);

  //set glb animation on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    actions["Circle.006Action.002"]!.play();

    let proxy = {
      get time() {
        return mixer.time;
      },
      set time(value) {
        actions["Circle.006Action.002"]!.paused = false;
        mixer.setTime(value);
        actions["Circle.006Action.002"]!.paused = true;
      },
    };

    //animation
    const animation = gsap
      .timeline()
      .to(proxy, { time: 4.6 })
      .add(() => {
        setIsParticlesPlay(true);
      }, "<0.05")
      .to(group.current!.position, { x: -1.2, y: -0.1, z: 4.25 }, "<0.2")
      .to(htmlContent.current!.position, { x: 0 }, "<")
      .to(text.current!.children[0], { fillOpacity: 0, duration: 0.1 }, "<")
      .to(text.current!.children[1], { fillOpacity: 0, duration: 0.1 }, "<")
      .to(proxy, { time: innerWidth < 1000 ? 9.5 : 9.275 })
      .to(htmlContent.current!.position, { x: -20 }, "<0.4")
      .set(proxy, { time: 8 }, "<0.1")
      .set(group.current!.position, { x: -2.06, y: 0.1, z: 4.25 }, "<")
      .to(htmlContentTwo.current!.position, { x: 0 }, "<")
      .to(proxy, { time: actions["Circle.006Action.002"]?.getClip().duration })
      .to(htmlContentTwo.current!.position, { x: -20 })
      .set(beeRef.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .to(props.backgroundRef.current!, { top: 0 }, "<")
      .to(htmlContentThree.current!.position, { y: 0 }, "<")
      .to(htmlContentThree.current!.position, { y: 20 })
      .to(htmlContentFour.current!.position, { y: 0 }, "<");

    ScrollTrigger.create({
      scrub: 1,
      pin: true,
      trigger: "#__next",
      end: "+=15000",
      animation,
    });
  }, [actions, mixer, props.backgroundRef]);

  return (
    <>
      <group ref={htmlContent} position={[20, 0, 0]}>
        <CardGridOne />
      </group>
      <group ref={htmlContentTwo} position={[20, 0, 0]}>
        <CardGridTwo />
      </group>
      <group ref={htmlContentThree} position={[0, -20, 0]}>
        <Earth scale={1.3} rotation-x={Math.PI * 0.5} position-y={-0.3} />
        <OurInvestor />
      </group>
      <group ref={htmlContentFour} position={[0, -20, 0]}>
        <Brain rotation-x={Math.PI * 0.5} position-x={3} position-y={0.5} />
        <Content />
      </group>
      <group
        ref={text}
        position={[0, 1.6, -6]}
        // scale={isMobile ? 0.6 : 1}
      >
        <Text fontSize={3} color="#ff9500" position-y={-5.5}>
          BEECOM
        </Text>
        <Text fontSize={3} color="#ff9500" position-y={-8.5}>
          DIGITAL
        </Text>
      </group>
      <group
        rotation-x={-Math.PI * 0.5}
        position={[0, 0.1, 4]}
        ref={group}
        {...props}
        dispose={null}
      >
        <group name="Scene">
          <group
            name="Plane"
            position={[-0.006, -0.402, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={-1}
          >
            <mesh
              name="Plane_1"
              geometry={nodes.Plane_1.geometry}
              material={materials["Material.001"]}
            />

            <mesh
              name="Plane_2"
              geometry={nodes.Plane_2.geometry}
              material={materials["Material.002"]}
            />
          </group>
          <mesh
            visible={false}
            name="Plane002"
            geometry={nodes.Plane002.geometry}
            material={materials["Material.003"]}
            position={[0, 0.043, 0]}
            rotation={[Math.PI, 0, Math.PI]}
          />
          <group
            name="Circle009"
            position={[-0.003, -0.419, -0.002]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={-0.019}
          >
            <mesh
              name="Circle008"
              geometry={nodes.Circle008.geometry}
              material={materials["Material.009"]}
              morphTargetDictionary={nodes.Circle008.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008.morphTargetInfluences}
            />
            <mesh
              name="Circle008_1"
              geometry={nodes.Circle008_1.geometry}
              material={materials["Material.010"]}
              morphTargetDictionary={nodes.Circle008_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_1.morphTargetInfluences}
            />
            <mesh
              name="Circle008_2"
              geometry={nodes.Circle008_2.geometry}
              material={materials["Material.013"]}
              morphTargetDictionary={nodes.Circle008_2.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_2.morphTargetInfluences}
            />
            <mesh
              name="Circle008_3"
              geometry={nodes.Circle008_3.geometry}
              material={materials["Material.012"]}
              morphTargetDictionary={nodes.Circle008_3.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_3.morphTargetInfluences}
            />
            <mesh
              name="Circle008_4"
              geometry={nodes.Circle008_4.geometry}
              material={materials["Material.014"]}
              morphTargetDictionary={nodes.Circle008_4.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_4.morphTargetInfluences}
            />
            <mesh
              name="Circle008_5"
              geometry={nodes.Circle008_5.geometry}
              material={materials["Material.015"]}
              morphTargetDictionary={nodes.Circle008_5.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_5.morphTargetInfluences}
            />
            <mesh
              name="Circle008_6"
              geometry={nodes.Circle008_6.geometry}
              material={materials["Material.016"]}
              morphTargetDictionary={nodes.Circle008_6.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_6.morphTargetInfluences}
            />
            <group
              ref={beeRef}
              name="Circle005"
              position={[0.025, 0.21, 0.018]}
              rotation={[-Math.PI / 2, 0.67, 0]}
              scale={-113.322}
            >
              <mesh
                name="Circle007"
                geometry={nodes.Circle007.geometry}
                material={materials["Material.007"]}
              />
              <mesh
                name="Circle007_1"
                geometry={nodes.Circle007_1.geometry}
                material={materials["Material.008"]}
              />
              <mesh
                name="Circle007_2"
                geometry={nodes.Circle007_2.geometry}
                material={materials.Material}
              />
              <mesh
                name="Circle007_3"
                geometry={nodes.Circle007_3.geometry}
                material={materials["Material.004"]}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/beeAnime.glb");
