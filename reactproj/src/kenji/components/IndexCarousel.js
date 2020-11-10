import React from 'react'
import { Carousel,Radio,RadioGroup,Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';




const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
};
function IndexCarousel() {
  const [placement, setPlacement] = React.useState('right');
  const [shape, setShape] = React.useState('dot');

  function updatePlacement(value) {
    setPlacement(value);
  }

  function updateShape(value) {
    setShape(value);
  }

  return (
    <>
      <Carousel
        key={`${placement}.${shape}`}
        placement={placement}
        shape={shape}
        className="indexCarousel"
      >
        <img
          src="https://pbs.twimg.com/media/CEE3gV1WoAA-A2R.jpg"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
          height="250"
        />
      </Carousel>
      <button className="carouselButton">百靈果NEWS</button>
      <div className="carouselButtonBack"></div>
      <div className="carouselBanner">
        百靈果NEWS百靈果NEWS百靈果NEWS百靈果NEWS 百靈果NEWS
      </div>
    </>
  );
}
export default IndexCarousel;
