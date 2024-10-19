import { Html } from "@react-three/drei";

const Content = () => {
  return (
    <Html fullscreen>
      <div className="split-container">
        <div className="split-container_box">
          <h1>Spark light bulb moments</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quam
            est quis eveniet quaerat at magni sequi quisquam sit! Beatae
            aspernatur aliquid est molestiae perspiciatis adipisci in quis!
            Ipsa, laboriosam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quam
            est quis. Quaerat at magni sequi quisquam sit! Beatae aspernatur
            aliquid est eos!
          </p>
        </div>
        <div className="split-container_box"></div>
      </div>
    </Html>
  );
};

export default Content;
