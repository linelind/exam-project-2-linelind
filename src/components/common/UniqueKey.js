import PropTypes from "prop-types";

export default function UniqueKey(props) {
  return `${props}_${new Date().getTime()}`;
}

UniqueKey.propTypes = {
  props: PropTypes.string.isRequired,
};
