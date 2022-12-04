import PropTypes from "prop-types";
import FallbackAvatar from "../../images/fallbackavatar.jpg";

export default function Avatar(props) {
  return (
    <div className={props.styles}>
      <img src={props.media !== "" && props.media !== null ? props.media : FallbackAvatar} alt={`Profile of` + " " + props.alt} />
    </div>
  );
}

Avatar.propTypes = {
  styles: PropTypes.string,
  media: PropTypes.string,
  alt: PropTypes.string,
};
