import Heading from "../heading/Heading";
import PageTitle from "../misc/PageTitle";
import LocationsDisplay from "./LocationsDisplay";

function Locations({ locations }: { locations: HTLocations[] }) {
  return (
    <div>
      <Heading />
      <PageTitle title="Locations" />
      <LocationsDisplay locations={locations} />
    </div>
  );
}

export default Locations;
