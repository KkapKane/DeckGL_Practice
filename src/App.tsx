import IncomeData from "../src/assets/kaggle_income.json";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { useState, useEffect } from "react";

import "../src/Style.scss";
import { GridLayer } from "@deck.gl/aggregation-layers";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoia2thcGthbmUiLCJhIjoiY2xlcWhrOHpnMDRnZjNycTZkYTc3anMxMiJ9.CAQOno2NIvAsyP5EgfySDA";

const Styles = {
  Street: "mapbox://styles/mapbox/streets-v12",
  OutDoor: "mapbox://styles/mapbox/outdoors-v12",
  Light: "mapbox://styles/mapbox/light-v11",
  Dark: "mapbox://styles/mapbox/dark-v11",
  Satellite: "mapbox://styles/mapbox/satellite-v9",
  StreetSatellite: "mapbox://styles/mapbox/satellite-streets-v12",
  NavigationDay: "mapbox://styles/mapbox/navigation-day-v1",
  NavigationNight: "mapbox://styles/mapbox/navigation-night-v1",
};

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3,
  bearing: 0,
  pitch: 30,
};

function App() {
  const [currentStyle, setCurrentStyle] = useState(Styles.Dark);
  const [hoverInfo, setHoverInfo] = useState<any>();

  function hoverHandle(info: any) {
    if (info === undefined) {
      console.log("we null now");
    }
    if (info?.object?.points) {
      setHoverInfo(info);
    }
  }

  let layers: any = [
    new GridLayer({
      id: "gridTest",
      data: IncomeData,
      pickable: true,
      extruded: true,

      fp64: true,
      cellSize: 50000,
      elevationScale: 2000,
      getPosition: (d: any) => [parseFloat(d.Lon), parseFloat(d.Lat)],
      onHover: (info) => hoverHandle(info),
    }),
  ];

  return (
    <div className='App'>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map mapStyle={currentStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
        {hoverInfo ? (
          <div
            style={{
              position: "absolute",
              color: "red",
              fontSize: "2rem",
              zIndex: 1,
              pointerEvents: "none",
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}
          >
            {hoverInfo.object.points[0].source.Median}
          </div>
        ) : null}
      </DeckGL>
    </div>
  );
}

export default App;
