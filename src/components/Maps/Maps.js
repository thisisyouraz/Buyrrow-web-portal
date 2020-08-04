import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MAPS_KEY } from '../../config';
const Maps = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={18} defaultCenter={{ lat: props.cor[0].lat, lng: props.cor[0].long }}>
    {props.isMarkerShown &&
      props.cor &&
      props.cor.map((cord, key) => {
        console.log(cord.lat, cord.long);
        // return (<Marker position={{ lat: props.lat, lng: props.long }} />)
        const [label, setLabel] = React.useState('')
        return (

          <Marker key={key} label={label} onMouseOver={() => setLabel(cord.title)} onMouseOut={() => setLabel('')} position={{ lat: parseFloat(cord.lat), lng: parseFloat(cord.long) }} >

          </Marker>
        );
      })}
    {/* {console.log({ lat: (props.lat) ? props.lat : 31.52037, lng: (props.long) ? props.long : 74.358749 })} */}
  </GoogleMap>
)
);

export default Maps;