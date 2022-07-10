/* eslint-disable react/function-component-definition */
import type { NextPage } from "next";
import { promises as fs } from "fs";
import path from "path";
import Head from "next/head";
import Schedule from "../../components/events/Schedule";
import { toEventsData } from "../../utils/misc";

const SchedulePage: NextPage<ScheduleProps> = (props) => {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>D3F C0N Events</title>
        <meta name='description' content='DEF CON 30 Events' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-black'>
        <Schedule events={events} title='Schedule' />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const confFile = path.join(process.cwd(), "./public/static/conf/events.json");

  const eventFile = await fs.readFile(confFile, {
    encoding: "utf-8",
  });

  const events: HTEvent[] = JSON.parse(eventFile) ?? [];

  const eventsData = toEventsData(events);

  return {
    props: {
      events: eventsData,
    },
  };
}

export default SchedulePage;
