import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Img = ({ src, className }) => {
  return <LazyLoadImage effect="blur"  src={src} className={className || ""} />;
};

export default Img;
