import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet'

//fix for icon not loading
var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEx0lEQVRYR61XX2hbVRj/fecmuU3arn9caZLNoYO9tGwrVtC26WzdGLRJh1OcIvoggvowmYI6RUVBcYpsgjhEH/YgjLkXx8itQ9yfYG47VEpxfx+KOHFtUufc0iVrk+WeI+emadPtJvemel6Sc7/f7/t+5zvf+c69hCrGP1u2NGTV7FMQYgDgHUJhfkkngyfBlHFB/Ds1nz9017GfZpy6JSdA0dnpnvb7XjNI7GbAikocDpFigvb4M669FIvl7fzbCkgM9LYAOApFdNk5u80eN9y57auP/Hy1Eq+igD/CoSYXEGeE9iqDF+BcnFFz3k3Nx4+nyvErCpgaCmkkEC4lG5zj2lwW6dwtZLkBEgSPwlCnetCkqlDYUpcEHPFr+qNVC0gM9eyAoMOlxEwuj0QmDYMLS38KEYL1tfC53UvsRPSIPxo/akUqm4HJSM8ZBlpfJM3m8/gzlYbAQvCrAmKUhCAQ6wbQbJ4IENY01KPGpZTGGwto+v2OBVwe7O5QGBsvEmTIS9dnkDOMwiPCPuHJvNUfuzQnp6NdXd4sZvYQsEvOVUXBPQ0rJG5xKNQeOBq/cLsIywxMDfW+QkLsK4Llfk/eSJtTQXSwf/Tc01ariT3YfgiEJ6Vt9Yo61C7dip0BTd/vSEByqPtLIdjzRfBfmZtm4RUWzzY8dPrsWSsBp7rbOkiQmblmbw1afN4SGH0e0OIvORIwGQ4dZoQdRfBUOo0b2VuFDKgt7v4yDeZUX5+LsldMYL3qQbCudiEegQ76tfgdmbPcgkSk+2uAPVNkJzMZpOZy5pS5eHBT/GLCKgMnujauUpC/LG2NNR601i4KAHAgoOnPOcpAIhJ6D8C7RfD1uRymM5n5Kb3ed/rcJ5Y10NX2JkAfSpu/zocGVV2ACeCdoKZ/4EjAZKR7KwP7vgjmQuC3aynIXw4xyxiF+0bOnyp1drKrbTPjpIGhhhFhbVMDZF8oDiK22R/98aQjAfLySQbUSYDJe8AcsghlMcrBAc44DgtCwSHDFiHwOJP/ALTW+tBYs7h6DpEMpt13W11OZRvRVCT0NgHvlyouPQ1WWyCf3Vn9snLxRmBY/9iKU17AUKePDO9FMKwpJcqe8PfNWWSLTWneKJvPSp8XdZ6lbZhz4/fcTbXt3ljMbFqOtqAISkZ6nhCgb6yIsivmDG52Ow9TzAvJagghHgsOj3xbLmP27wPhUByEUDkHlZ4LIBbU9P5KGFsBU+FQpyD8wpZ2dls9nIO7GO5r1fRf/5MASU4Mhg6A4VnbqCUAIv6VPzr6gh3HNgPSwfS2B1rzefcEY6i3c1g4piLFDLYucCx+xQ7vSICZhXBoNwgf2Tk07QKvBob1vU6wjgVMDAyoXiV1QQFbW7nw+EQgkW2nsbHC7WUzHAuQfqYioe0ElD1SEkPANr+mR+0CF+1VCZCkyUjPCQZ62PrM44fgsL7VafB5wdXAgeTgpvUG8uOMsSUvfZxzgym0MRAdOV+Nx6ozUDiWvV+AiRdLA3Fg/ypN31lN8GVlwKyFob6VzMhNCMYaCwH5NcOdX2f3FWQlblkZMEWEe14mok/NVRB2+aP6Z9WuftkZMI+6+c7glS+n3J92bXDyIfq/ZsCshUjPIAgiEB05tpzVS86/xs+nMM3bobgAAAAASUVORK5CYII=',
});

export default function drawMap(props) {
    //create variable for props (array containing objects)
    const markersList = props.markers;

    const drawMarkers = markersList.map((markerData, index) => 
    <Marker
    position={[markerData.lat, markerData.long]}
    icon={myIcon}
    key={index}
    >
      <Popup>
        {markerData.countryName}
        Cases: {markerData.cases}
        Active: {markerData.active}
        Deaths: {markerData.deaths}
      </Popup>
    </Marker>)

    return (
      <Map center={[30, 31]} zoom={2}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {drawMarkers}
      </Map>
    );
  }
