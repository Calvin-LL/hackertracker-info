import NavLinks from "./NavLinks";

function Heading() {
  return (
    <div className='navbar bg-black sticky top-0 z-50 h-16'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <NavLinks />
        </div>
      </div>
      <div className='navbar-center'>
        <p className='md:text-5xl lg:text-5xl text-4xl font-bold font-mono'>
          D<span className='text-dc-red'>3</span>F C
          <span className='text-dc-red'>0</span>N
        </p>
      </div>
      <div className='navbar-end' />
    </div>
  );
}

export default Heading;
