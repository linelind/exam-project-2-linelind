function Loader() {
  return (
    <div className='loaderContainer'>
      <div className='spinner-grow text-dark loaderColour' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div className='spinner-grow text-dark loaderColour' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div className='spinner-grow text-dark loaderColour' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
