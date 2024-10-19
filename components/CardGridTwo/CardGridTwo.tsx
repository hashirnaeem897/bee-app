import { Html } from "@react-three/drei";
import Card from "../Card/Card";

type Props = {};

const CardGridTwo: React.FC<Props> = () => {
  const desc =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi consequatur cupiditate hic architectad ab asperiores libero velit facere.";

  const isMobile = innerWidth > 900;
  const isDesktop = innerWidth > 1400;

  return (
    <Html fullscreen>
      <div className="card-container">
        <Card
          style={
            {
              "--left": isDesktop ? "5%" : "0%",
              "--top": isDesktop ? "45%" : isMobile ? "40%" : "30%",
            } as React.CSSProperties
          }
          title={"Title Four"}
          desc={desc}
        />
        <Card
          style={
            {
              "--left": isMobile ? "30%" : "26%",
              "--top": isMobile ? "10%" : "-10%",
            } as React.CSSProperties
          }
          title={"Title Five"}
          desc={desc}
        />
        <Card
          style={
            {
              "--left": isMobile ? "60%" : "48%",
              "--top": isMobile ? "55%" : "38%",
            } as React.CSSProperties
          }
          title={"Title Six"}
          desc={desc}
        />
      </div>
    </Html>
  );
};

export default CardGridTwo;
