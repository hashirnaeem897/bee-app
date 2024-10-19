import { Plane, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

export const BoxOne = (props: JSX.IntrinsicElements["mesh"]) => {
  const map = useTexture("/box-1.png");
  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={map} transparent />
    </mesh>
  );
};
export const BoxTwo = (props: JSX.IntrinsicElements["mesh"]) => {
  const map = useTexture("/box-2.png");
  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={map} transparent />
    </mesh>
  );
};
export const BoxThree = (props: JSX.IntrinsicElements["mesh"]) => {
  const map = useTexture("/box-3.png");
  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={map} transparent />
    </mesh>
  );
};

const Boxes = (props: { state: boolean }) => {
  const [tl, setTl] = useState<GSAPTimeline>();
  const one = useRef<Group>(null);
  const two = useRef<Group>(null);
  const three = useRef<Group>(null);
  const four = useRef<Group>(null);
  const five = useRef<Group>(null);
  const six = useRef<Group>(null);
  const seven = useRef<Group>(null);
  const eight = useRef<Group>(null);

  useEffect(() => {
    const timeline = gsap
      .timeline({
        paused: true,
      })
      .from(one.current!.position, { x: 0, y: 0, z: 0 })
      .from(one.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(two.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(two.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(three.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(three.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(four.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(four.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(five.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(five.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(six.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(six.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(seven.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(seven.current!.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(eight.current!.position, { x: 0, y: 0, z: 0 }, "<0.1")
      .from(eight.current!.scale, { x: 0, y: 0, z: 0 }, "<");
    setTl(timeline);
  }, []);

  useEffect(() => {
    tl?.play();
    tl?.reversed(!props.state);
  }, [props.state, tl]);

  return (
    <>
      <group ref={one}>
        <BoxOne scale={0.8} position={[1, 2, 0]} />
      </group>
      <group ref={two}>
        <BoxOne scale={1.2} position={[1.5, 3.5, 0]} />
      </group>
      <group ref={three}>
        <BoxOne scale={0.6} position={[2.8, 4.5, 0]} />
      </group>
      <group ref={four}>
        <BoxOne scale={1.2} position={[4, 3, 0]} />
      </group>
      <group ref={five}>
        <BoxTwo scale={0.8} position={[1.8, 4.6, 0]} />
      </group>
      <group ref={six}>
        <BoxTwo scale={1} position={[2.5, 2.5, 0]} />
      </group>
      <group ref={seven}>
        <BoxThree scale={0.6} position={[3, 3.6, 0]} />
      </group>
      <group ref={eight}>
        <BoxThree position={[4, 4.5, 0]} />
      </group>
    </>
  );
};

export default Boxes;
