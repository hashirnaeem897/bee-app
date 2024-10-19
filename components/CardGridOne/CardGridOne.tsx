import { Html } from "@react-three/drei";
import Card from "../Card/Card";

type Props = {};

const CardGridOne: React.FC<Props> = () => {
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
              "--left": isMobile ? "10%" : "0%",
              "--top": isDesktop ? "5%" : isMobile ? "0%" : "-10%",
            } as React.CSSProperties
          }
          title={"Title One"}
          desc={desc}
        />
        <Card
          style={
            {
              "--left": isMobile ? "30%" : "20%",
              "--top": isDesktop ? "50%" : isMobile ? "45%" : "35%",
            } as React.CSSProperties
          }
          title={"Title Two"}
          desc={desc}
        />
        <Card
          style={
            {
              "--left": "55%",
              "--top": isDesktop ? "1%" : "-4%",
            } as React.CSSProperties
          }
          title={"Title Three"}
          desc={desc}
        />
      </div>
    </Html>
  );
};

export default CardGridOne;
