import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OverviewMap,ScaleLine,FullScreen,ZoomSlider, Rotate,MousePosition,  defaults }from "ol/control";
import imgg_close from "../logo.svg";
import OSM from "ol/source/OSM";
import OGCMapTile from 'ol/source/OGCMapTile.js';
import {fromLonLat} from 'ol/proj';
import React, { useEffect, useRef, useState } from 'react';
import XYZ from "ol/source/XYZ";
import LayerControl from "./LayerControl/index";
import BaseLayerConfig from "./LayerControl/layersConfig";
import D1 from "./Data/d1_degree.geojson";

import {  Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";

import './olmap.css';
const Main = () => {
  const mapRef = useRef(null);
  let map = null;
  let layerconfig=BaseLayerConfig();
  let AllLayer = null;
  let OverviewMapControl = null;
  function CreateLayer(layer) {
    let resultLall =[];
    switch (layer.type) {
      case "XYZ":
      if(layer.basetype == "single")
      {
        let result1 = new TileLayer({
          source: new XYZ({
            url: layer.url,//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            crossOrigin: "anonymous",
          }),
          id:layer.id,
        });
        result1.setVisible(layer.isBaseLayer);  
        resultLall.push(result1);
      }else {
        let result2 = new TileLayer({
          source: new XYZ({
            url: layer.url[1],//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            crossOrigin: "anonymous",
          }),
          id:layer.id + "1",
        });
        result2.setVisible(layer.isBaseLayer);  
        let result3 = new TileLayer({
          source: new XYZ({
            url: layer.url[0],//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            crossOrigin: "anonymous",
          }),
          id:layer.id + "0",
        });
        result3.setVisible(layer.isBaseLayer);  
        resultLall.push(result2, result3);
      }
        break;
      case "OGCMapTile":
          let result4 =new TileLayer({
            source: new OGCMapTile({
              url:  layer.url,//'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
            }),
            id:layer.id,
            crossOrigin: "anonymous",
          });
          result4.setVisible(layer.isBaseLayer);  
          resultLall.push(result4);
        break;
      default:
        break;
    }
    return resultLall;
  }

  function CreateLayers(layers) {
    let list = [];
    if(layers) {
      layers.forEach(element => {
        let templayer =  CreateLayer(element);
        list= [...list, ...templayer]
      });
    }
    return list.filter(v => v);
  }
  const AddHexGrid = (map) => {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          url: D1,
          format: new GeoJSON(),
        }),
      })
    );
  }
  function GetBaseLayer(layers) {
    if(layers) {
      return layers.filter(g => g.isBaseLayer).length > 0? layers.filter(g => g.isBaseLayer): [];
    }
    return [];
  }
  useEffect(() => {
    if(map == null) {
      let viewlayer = CreateLayers(GetBaseLayer(layerconfig))
      OverviewMapControl = new OverviewMap({        // 实例化一个OverviewMap类的对象，并加入到地图中
                                collapsed: false,
                                layers: [ ...viewlayer ]
                           });
      AllLayer =  CreateLayers(layerconfig);
      map = new Map({
        target: mapRef.current,
        layers: AllLayer,
        view: new View({
          center: fromLonLat([118.90, 31.9080]),
          zoom: 8,
          projection:'EPSG:3857',
        }),
        controls: defaults().extend([
          OverviewMapControl,
          new ScaleLine(),
          // 缩放滑块
          new ZoomSlider(),
          new MousePosition(),
        ])
      });
      // AddHexGrid(map);
      console.log("useEffect");
    }
  }, []);
  const onChangeBaseLayerHandler = ({id, basetype}) => {
    if(map) {
      console.log("onChangeBaseLayerHandler",id);
      AllLayer.forEach(element => {
        if(basetype == "single") {
          if(element.get("id") == id) {
            element.setVisible(true);
          }
          else {
            element.setVisible(false);
          }
        }else {
          if(element.get("id") == (id + "0") || element.get("id") == (id + "1")) {
            element.setVisible(true);
          }
          else {
            element.setVisible(false);
          }
        }
      });
      layerconfig.forEach(element => {
          if(element.id == id) {
            element.isBaseLayer = true;
          }else {
            element.isBaseLayer = false;
          }
      });
      map.removeControl(OverviewMapControl);
      let viewlayer = CreateLayers(GetBaseLayer(layerconfig))
      OverviewMapControl = new OverviewMap({// 实例化一个OverviewMap类的对象，并加入到地图中
                                collapsed: false,
                                layers: [ ...viewlayer ]
                           });
      map.addControl(OverviewMapControl);
    }
  };
 
  return (
    <div class="map-head1">
      <div class="map-head" style={{ width: '100%', height: '6vh' }}>
     
        <div class="map-head-left">
          <img class="map-head-left-img" src={imgg_close}/>
          <img class="map-head-left-img" src={imgg_close}/>
          <img class="map-head-left-img" src={imgg_close}/>
          <img class="map-head-left-img" src={imgg_close}/>
          <img class="map-head-left-img" src={imgg_close}/>
        </div>
        <div class="map-head-center">🛫地理信息系统</div>
        <div class="map-head-right">
          <img class="map-head-left-img" src={imgg_close}/>
          <img class="map-head-left-img" src={imgg_close}/>
        </div>
      </div>
      <div  class="" style={{ width: '100%', height: '94vh' }}>
        <div ref={mapRef} style={{ width: '100%', height: '94vh' }} />
        <LayerControl BaseLayer={layerconfig} onChangeBaseLayer={onChangeBaseLayerHandler} ></LayerControl>
      </div>
    </div>
   
  );
};
 
export default Main;