import Image from "next/image";

type Props = {
  title: string;
  desc: string;
  style: React.CSSProperties | undefined;
};

const Card: React.FC<Props> = ({ title, desc, style }) => {
  return (
    <div style={style} className="card">
      <div className="card_img">
        <Image src="/demo.jpg" alt="card-img" fill />
        <h1 className="card_img_heading">{title}</h1>
      </div>
      <div className="card_content">
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default Card;
