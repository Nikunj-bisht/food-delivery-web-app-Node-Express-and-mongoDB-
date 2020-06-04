
const locations=JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);
mapboxgl.accessToken = 'pk.eyJ1IjoibmlrdW5qMTIiLCJhIjoiY2thOXczNmV0MDlsMjJ6b2llMnN4b2N6MSJ9.SguZCrv8SBxNd5OYlgjh-Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
});

const bounds=new mapboxgl.LngLatBounds();


locations.forEach(el=> {
  const loc=document.createElement('div');
  loc.className='marker';
  new mapboxgl.Marker({
    element:loc,
    anchor:'bottom',
    zoom:1
    }).setLngLat([76.768066,30.741482]).addTo(map);

    bounds.extend([76.768066,30.741482]);
   
});
 

map.fitBounds(bounds);
