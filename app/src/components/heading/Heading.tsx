import HeadingLogo from "./HeadingLogo";
import NavLinks from "./NavLinks";

function Heading() {
  return (
    <header className="sticky top-0 z-50 pb-2">
      <nav className="flex bg-black text-white h-20 items-center align-middle text-center justify-around py-1">
        <div className="flex-none ml-1">
          <div>
            <NavLinks />
          </div>
        </div>
        <div className="flex w-screen my-auto text-left ml-2 sm:ml-3 md:ml-4 lg:ml-5">
          <HeadingLogo />
        </div>
        <div className="flex text-right mr-5" />
      </nav>
    </header>
  );
}

export default Heading;
