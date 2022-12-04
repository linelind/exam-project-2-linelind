import PropTypes from "prop-types";

export default function PostImage(props) {
  if (props.media !== "" && props.media !== null) {
    return <img src={props.media} alt='Visual part of post.' className='postCardImage' />;
  } else {
    return null;
  }
}

PostImage.propTypes = {
  media: PropTypes.string,
};
