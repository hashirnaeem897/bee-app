import { Html } from "@react-three/drei";

const OurInvestor = () => {
  return (
    <Html fullscreen>
      <div className="split-container">
        <div className="split-container_box">
          <h1>Our Investors</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quam
            est quis eveniet quaerat at magni sequi quisquam sit! Beatae
            aspernatur aliquid est molestiae perspiciatis adipisci in quis!
            Ipsa, laboriosam.
          </p>
        </div>
        <div className="split-container_name-grid">
          <h2>seedcamp</h2>
          <h2>evening fund</h2>
          <h2>roman schumacher</h2>
          <h2>james meekings</h2>
          <h2>valla ventures</h2>
        </div>
      </div>
    </Html>
  );
};

export default OurInvestor;
