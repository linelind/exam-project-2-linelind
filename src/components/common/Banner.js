import PropTypes from "prop-types";
import FallbackBanner from "../../images/fallbackbanner.jpg";

export default function Banner(props) {
  return (
    <div className={props.styles}>
      <img src={props.media !== "" && props.media !== null ? props.media : FallbackBanner} alt={`Banner image for` + " " + props.alt} />
    </div>
  );
}

Banner.propTypes = {
  styles: PropTypes.string,
  media: PropTypes.string,
  alt: PropTypes.string,
};
