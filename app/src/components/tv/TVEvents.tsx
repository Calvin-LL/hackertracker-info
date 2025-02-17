import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dateGroupTitle, eventDay } from "../../utils/dates";
import Theme from "../../utils/theme";
import TVClock from "../clock/TVClock";
import TVEventCell from "./TVEventCell";
import localFont from "next/font/local";

const freewayFont = localFont({
  src: "../../../public/fonts/freeway-gothic.woff2",
  display: "swap",
  variable: "--font-freeway",
});

function TVEvents({ events }: { events: EventData[] }) {
  const [filteredEvents, setFilteredEvents] = useState<
    Map<string, EventData[]>
  >(new Map());

  const theme = new Theme();
  const router = useRouter();
  const { l, t } = router.query;

  useEffect(() => {
    const groupedDates = (
      displayEvents: EventData[]
    ): Map<string, EventData[]> =>
      displayEvents
        .sort((a, b) => a.beginTimestampSeconds - b.beginTimestampSeconds)
        .reduce((group, e) => {
          const day = eventDay(new Date(e.begin));
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          const groups = group.get(day) ?? [];
          groups.push(e);
          group.set(day, groups);
          return group;
        }, new Map<string, EventData[]>());

    const filterEvents = () => {
      const filterTag = Number(l ?? 45589) ?? 45589;

      return groupedDates(
        events.filter((e) => {
          if (!e.tags.map((t) => t.id).includes(filterTag)) {
            return false;
          }

          const future = new Date();
          future.setHours(future.getHours() + (Number(t ?? 6) ?? 6));

          const now = new Date();

          const begin = new Date(e.begin).getTime();

          if (begin >= now.getTime() && begin <= future.getTime()) {
            return true;
          }

          return false;
        })
      );
    };

    setFilteredEvents(filterEvents());

    const pageScroll = () => {
      window.scrollBy({
        top: 45,
        left: 0,
        behavior: "smooth",
      });
    };

    const scrollPageInt = setInterval(() => {
      setFilteredEvents(filterEvents());
      const scroll = setInterval(() => {
        pageScroll();
      }, 900);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        clearInterval(scroll);
      }, 70000);
    }, 70100);
    return () => {
      clearInterval(scrollPageInt);
    };
  }, [events, l, t]);

  return (
    <div className="flex justify-end mb-2 mr-14 ml-5">
      <div className="flex-initial w-full mr-2">
        {Array.from(filteredEvents).map(([day, dayEvents]) => (
          <div key={day}>
            <div className="date-events">
              <div
                className={`border-4 border-white bg-${theme.nextColor} rounded-b-lg`}
              >
                <p className="text-gray-light text-4xl p-2 ml-1">
                  {dateGroupTitle(day)}
                </p>
              </div>
              {dayEvents
                .sort(
                  (a, b) => a.beginTimestampSeconds - b.beginTimestampSeconds
                )
                .map((event) => (
                  <div className="event" key={event.id} aria-hidden="true">
                    <TVEventCell event={event} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-initial ml-5 mt-4">
        <div className="sticky top-36 z-100">
          <p
            className={`text-center text-9xl mb-10 font-bold ${freewayFont.className}`}
          >
            NFO Node
          </p>
          <p className="text-xl">Current time:</p>
          <TVClock />
        </div>
      </div>
    </div>
  );
}

export default TVEvents;
