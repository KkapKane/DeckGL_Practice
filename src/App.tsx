import NATIONAL_PARKS_DATA from "../data.json";
import covid_Data from '../src/assets/us_county.json'
import {Map} from 'react-map-gl'
import DeckGL from "@deck.gl/react/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import {useEffect, useState} from 'react';
import { Layer, LayersList } from "@deck.gl/core/typed";
import { HexagonLayer } from "deck.gl";
import "../src/Style.scss"
import DropDown from "./Components/DropDown";

const MAPBOX_ACCESS_TOKEN =
 "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhrOHpnMDRnZjNycTZkYTc3anMxMiJ9.CAQOno2NIvAsyP5EgfySDA";

const Styles = {
  Street: "mapbox://styles/mapbox/streets-v12" ,
   OutDoor: "mapbox://styles/mapbox/outdoors-v12" ,
   Light: "mapbox://styles/mapbox/light-v11" ,
   Dark: "mapbox://styles/mapbox/dark-v11" ,
   Satellite: "mapbox://styles/mapbox/satellite-v9" ,
   StreetSatellite: "mapbox://styles/mapbox/satellite-streets-v12" ,
  NavigationDay: "mapbox://styles/mapbox/navigation-day-v1" ,
 NavigationNight: "mapbox://styles/mapbox/navigation-night-v1" ,
} 



const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
  bearing: 0,
  pitch: 30,
};

function App() {
  
  
  const [currentStyle, setCurrentStyle] = useState(Styles.Dark);




let layers: any = [
  new ScatterplotLayer({
    id: "scatterplot-layer",
    data: covid_Data,
    pickable: true,
    stroked: true,
    opacity: 0.8,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 6,
    radiusMaxPixels: 6,
    lineWidthMinPixels: 1,

    getPosition: (d) => [parseFloat(d.long), parseFloat(d.lat)],
    getFillColor: (d) =>
      d.fips > 0 ? [200, 0, 40, 150] : [100, 100, 100, 100],
    getLineColor: (d) => [0, 0, 0],
  }),
  new HeatmapLayer({
    id: "heat",
    data: covid_Data,
    getPosition: (d) => [parseFloat(d.long), parseFloat(d.lat)],
    getWeight: (d) => d.fips,
    radiusPixels: 20,
    intensity: 10,
    threshold: 0.03,
    colorRange: [
      [255, 255, 178],
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [240, 59, 32],
      [189, 0, 38],
    ],
  }),
  new HexagonLayer({
    id: "hex",
    data: covid_Data,
    getPosition: (d) => [parseFloat(d.long), parseFloat(d.lat)],
    getElevationWeight: d => d.fips,
    elevationScale: 100,
  }),
];



  return (
    <div className="App">
     <DropDown Styles={Styles} setCurrentStyle={setCurrentStyle}/> 
    <DeckGL  initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <Map mapStyle={currentStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      
    </DeckGL>
    </div>
  )
}

export default App
