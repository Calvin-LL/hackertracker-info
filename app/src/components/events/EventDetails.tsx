import { eventWeekday, timeDisplayParts } from "../../utils/dates";
import { StarIcon, ClockIcon, MapIcon } from "@heroicons/react/outline";

import Link from "next/link";

export function EventDetails({ event }: EventCellProps) {
  return (
    <div className='mt-2 ml-5'>
      <div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl mb-5 text-white'>
          {event.title}
        </h1>
      </div>
      <div>
        <div className='flex items-center bg-dc-gray w-11/12 mt-2 md:h-14 lg:h-16 h-12 rounded-lg'>
          <div
            className='rounded-full h-5 w-5 md:h-7 md:w-7 lg:w-8 lg:h-8 ml-3 mr-2'
            style={{
              backgroundColor:
                event.type.color === "#ababa" ? "#e25238" : event.type.color,
            }}
          />
          <p className='md:text-base lg:text-lg text-xs text-white '>
            {event.type.name}
          </p>
        </div>
        <div className='flex items-center bg-dc-gray w-11/12  mt-2 md:h-14 lg:h-16 h-12 rounded-lg'>
          <ClockIcon className='h-5 w-5 md:h-7 md:w-7 lg:w-8 lg:h-8 ml-3 mr-2' />
          <p className='md:text-base lg:text-lg text-xs text-white '>
            {event.type.name}
          </p>
        </div>
        <div className='flex items-center bg-dc-gray w-11/12  mt-2 md:h-14 lg:h-16 h-12 rounded-lg'>
          <MapIcon className='h-5 w-5 md:h-7 md:w-7 lg:w-8 lg:h-8 ml-3 mr-2' />
          <p className='md:text-base lg:text-lg text-xs text-white '>
            {event.location.name}
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <p className='text-sm md:text-base lg:text-lg'>{event.description}</p>
      </div>
    </div>
  );
}

export default EventDetails;