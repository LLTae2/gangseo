/*global kakao */
import markerData from "./markerData";

export default function KakaoMapScript() {
  const container = document.getElementById('myMap');

  const options = {
    center: new kakao.maps.LatLng(35.150369020443875, 128.87847858651804),
    level: 7
  };
  const map = new kakao.maps.Map(container, options);
  markerData.forEach((el) => {
    //마커를 생성함
    var marker = new kakao.maps.Marker({
      //마커가 표시 될 지도
      map: map,
      position: new kakao.maps.LatLng(el.lat, el.lng), //생성될 마커의 위도와 경도 설정
    });

    var iwcontent = '<div><h4>{el.title}</h4><img src={el.image} alt="사진"/></div>' //이곳에서 오류 발생!
      
    // 마커에 표시할 인포윈도우를 생성함
    var infowindow = new kakao.maps.InfoWindow({
      content: iwcontent, // 인포윈도우에 표시할 내용
    });

    
    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
    // 이벤트 리스너로는 클로저를 만들어 등록
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨
    kakao.maps.event.addListener(
      marker,
      "mouseover", //마우스를 올려둘 때 이벤트
      makeOverListener(map, marker, infowindow),
    );
    kakao.maps.event.addListener(
      marker,
      "mouseout", //마우스가 떠날 때 이벤트
      makeOutListener(infowindow)
    );
    
  })
  // 인포윈도우를 표시하는 클로저를 만드는 함수
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }
  // 인포윈도우를 닫는 클로저를 만드는 함수
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
};