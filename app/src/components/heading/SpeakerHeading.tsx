import HeadingLogo from "./HeadingLogo";
import NavLinks from "./NavLinks";
import SpeakerSearch from "./SpeakerSearch";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SpeakerHeading({ speakers }: { speakers: Speaker[] }) {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="sticky top-0 z-50 pb-2">
      <header>
        <nav className="flex bg-black h-20 items-center align-middle text-center justify-around py-1">
          <div className="flex-none ml-1">
            <div>
              <NavLinks />
            </div>
          </div>
          <div className="flex w-screen my-auto text-left ml-2 sm:ml-3 md:ml-4 lg:ml-5">
            <HeadingLogo />
          </div>
          <div className="flex text-right mr-10">
            <button
              onClick={() => {
                setIsSearch(true);
              }}
            >
              <MagnifyingGlassIcon className="h-7 w-7 hover:text-dc-teal" />
            </button>
          </div>
        </nav>
      </header>

      <div>
        <Transition
          show={isSearch}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <Dialog
            open={isSearch}
            onClose={() => {
              setIsSearch(() => !isSearch);
            }}
            as="div"
            className="fixed inset-0 z-20 overflow-y-auto flex bg-black w-screen min-h-full items-center justify-center p-5"
          >
            <Dialog.Panel>
              <Dialog.Title>Event Search</Dialog.Title>
              <Dialog.Description></Dialog.Description>
              <SpeakerSearch speakers={speakers} />
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default SpeakerHeading;