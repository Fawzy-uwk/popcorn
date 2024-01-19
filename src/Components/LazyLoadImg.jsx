import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
/* eslint-disable react/prop-types */

function LazyLoadImg({ src, className }) {
  return (
    <LazyLoadImage className={className || ""} effect="blur" src={src} alt="" />
  );
}

export default LazyLoadImg;
