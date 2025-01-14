import Head from "next/head";
import Event from "../../components/events/Event";
import useSWR from "swr";
import { fetcher } from "@/utils/misc";
import Loading from "@/components/misc/Loading";
import Error from "@/components/misc/Error";
import { useSearchParams } from "next/navigation";

export default function EventPage() {
  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsIsLoading,
  } = useSWR<HTEvent[], Error>("/ht/events.json", fetcher);

  const { data: tags, isLoading: tagsIsLoading } = useSWR<HTTag[], Error>(
    "/ht/tags.json",
    fetcher
  );

  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  if (eventsIsLoading || tagsIsLoading) {
    return <Loading />;
  }

  if (eventId == null || eventId === "") {
    return <Error msg="No event id provided" />;
  }
  const event = eventsData?.find((e) => e.id.toString() === eventId);

  if (event === undefined) {
    return <Error msg="No event found for id" />;
  }

  if (eventsData === undefined || eventsError !== undefined) {
    return <Error />;
  }

  return (
    <div>
      <Head>
        <title>{`DEF CON 31 ${event.title}`}</title>
        <meta name="description" content="DEF CON 31 Event" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black mb-20 text-white">
        <Event event={event} tags={tags ?? []} />
      </main>
    </div>
  );
}
