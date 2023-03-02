import NATIONAL_PARKS_DATA from "../data.json";
import covid_Data from '../src/assets/us_county.json'
import {Map} from 'react-map-gl'
import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";

const MAPBOX_ACCESS_TOKEN =
 "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhrOHpnMDRnZjNycTZkYTc3anMxMiJ9.CAQOno2NIvAsyP5EgfySDA";
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";


const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
  bearing: 0,
  pitch: 30,
};

function App() {

  const onClick = (info: any) => {
    if(info.object) {
      alert(info.object.properties.Name)
    }
  }


let layers = [
  new GeoJsonLayer({
    id: "nationalParks",
    data:  NATIONAL_PARKS_DATA,
    filled: true,
    pointRadiusMinPixels: 5,
    pointRadiusScale: 2000,
    getPointRadius: (f) => 5,
    getFillColor: (data: any) =>
      data.properties.Name.includes("National Park")
        ? [86, 144, 58, 250]
        : [0, 0, 0, 250],
    pickable: true,
    autoHighlight: true,
    onClick,
  }),
];

  return (
    <DeckGL  initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  )
}

export default App
