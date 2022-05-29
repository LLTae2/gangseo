/*global kakao*/ 
import React, { useEffect } from 'react'



const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.149203650346095, 128.8792417991818),
      level: 6
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(35.149203650346095, 128.8792417991818); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    }, [])


    return (
        <div>
            <div id="map" style={{width:"1000px", height:"500px"}}></div>
       
        </div>
    )
}

export default Location;