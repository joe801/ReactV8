import { useState } from "react";

const CarouselFunctional = ({ images }) => {
  const [active, setActive] = useState(0);

  const handleIndexClick = (e) => {
    setActive( +e.target.dataset.index)
  }
  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            onClick={handleIndexClick}
            data-index={index}
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselFunctional;
