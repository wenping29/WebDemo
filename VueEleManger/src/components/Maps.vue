<template>
    <div class="id_map" id="id_map">
    </div>
</template>
<script>
import { computed, onMounted } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import L from 'leaflet';
import  './leafleatJS/leaflet.ChineseTmsProviders';

//import './leafleatJS/Leaflet.TileLayer.MBTiles';

//import mbtile from './data/countries-raster.mbtiles';

import 'leaflet/dist/leaflet.css';

export default {
    setup() {
        onMounted(() => {
            initMap();
        });
        const initMap = () => {
 

          function AddMbtileLayer(map){

            var mb = L.tileLayer.mbTiles(mbtile, {
              minZoom: 0,
              maxZoom: 6
            }).addTo(map);

            mb.on('databaseloaded', function(ev) {
              console.info('MBTiles DB loaded', ev);
            });
            mb.on('databaseerror', function(ev) {
              console.info('MBTiles DB error', ev);
            });

          }
          function CreateMap() {

            let osm = CreateOSM();
            let normal = Createnormal();
            let cities = CreateMarks();
            let image = Createimage();
            let streets = Createstreet();

            var map = L.map("id_map", {
              center: [32.0059, 118.776529],
              zoom: 12,
              layers: [normal,image],
              zoomControl: true
            });
            var baseLayers = {
                "地图": normal,
                "影像": image,
                //'OpenStreetMap': osm,
                //'Streets': streets
            };

            let overlays = {
              'Cities': cities
            };

            //L.control.layers(baseLayers, overlayLayers).addTo(map);
            let layerControl = L.control.layers(baseLayers, overlays).addTo(map);
            //let parks = L.layerGroup([crownHill, rubyHill]);

            //let satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
            //layerControl.addBaseLayer(satellite, 'Satellite');
            //layerControl.addOverlay(parks, 'Parks');
            return map;
          } 

          function CreateMarks() {

            let cities = L.layerGroup();
            let mLittleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
            let mDenver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
            let mAurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
            let mGolden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);

            let crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.').addTo(cities);
            let rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.').addTo(cities);
            return cities;
          }

          function CreateOSM() {
            let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
            return osm;
          }

          function Createstreet() {
            let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
            let mbUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`;

            let streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

            return streets;
          } 
          function Createnormal() {

            let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                maxZoom: 18,
                minZoom: 1
            });
            let normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                maxZoom: 18,
                minZoom: 1
            });

            return L.layerGroup([normala,normalm]);
          }
          function Createimage() {
            let imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                maxZoom: 18,
                minZoom: 1
            });
            let imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                maxZoom: 18,
                minZoom: 1
            });
            return L.layerGroup([imgm, imga]);
          }
 
          let map = CreateMap();

          //AddMbtileLayer(map);

          // L.control.zoom({
          //     zoomInTitle: '放大',
          //     zoomOutTitle: '缩小'
          // }).addTo(map);

        }
        return {
        };
    },
};
</script>
<style scoped>
.id_map{
  height: 100%;
}

</style>
