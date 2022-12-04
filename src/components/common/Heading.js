import PropTypes from "prop-types";

export default function Heading({ size = 1, title, styling }) {
  const HeadingSize = `h${size}`;

  if (size === 2 && title.length > 15) {
    return <HeadingSize className={styling}>{title.substring(0, 15) + "..."}</HeadingSize>;
  } else {
    return <HeadingSize className={styling}>{title}</HeadingSize>;
  }
}

Heading.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
  styling: PropTypes.string,
};
