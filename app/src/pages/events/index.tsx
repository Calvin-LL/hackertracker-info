import Head from "next/head";
import Schedule from "../../components/events/Schedule";
import useSWR from "swr";
import { fetcher, toEventsData } from "@/utils/misc";
import Loading from "@/components/misc/Loading";
import Error from "@/components/misc/Error";

export default function Events() {
  const { data, error, isLoading } = useSWR<HTEvent[], Error>(
    "/ht/events.json",
    fetcher
  );

  const { data: tags, isLoading: tagsIsLoading } = useSWR<HTTag[], Error>(
    "/ht/tags.json",
    fetcher
  );

  if (isLoading || tagsIsLoading) {
    return <Loading />;
  }

  if (data === undefined || error !== undefined) {
    return <Error />;
  }

  const events = toEventsData(data, tags ?? []);

  return (
    <div>
      <Head>
        <title>DEF CON 31 Events</title>
        <meta name="description" content="DEF CON 31 Events" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black mb-20 text-white">
        <Schedule events={events} title="Schedule" />
      </main>
    </div>
  );
}
