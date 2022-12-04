import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div>
        <Link to={`/`}>
          <p className='footerLink'>Feed</p>
        </Link>
        <Link to={`/myprofile`}>
          <p className='footerLink'>My profile</p>
        </Link>
      </div>
      <p className='footerCredit'>By Line Lindheim Tøresby</p>
    </footer>
  );
}

export default Footer;
