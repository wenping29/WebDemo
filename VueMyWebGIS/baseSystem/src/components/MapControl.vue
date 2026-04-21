<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Feature, Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import { Circle, Point, Polygon } from "ol/geom";
import { Cluster, Vector } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import KML from 'ol/format/KML.js';
import Fill from "ol/style/Fill";
import GeoJSON from 'ol/format/GeoJSON.js';
import {Circle as CircleStyle} from 'ol/style.js';
import { getBaseLayers,getBaseLayer } from '@/Pages/Vehicle/LayerConfig';
import { CreateLayer,addArcGISWorld,removeLayerByName,addArcGISImg,addTDTCvaLayer,addTDTVecLayer,addTDTImgLayer,addGdLayer,addBdLayer } from "@/Pages/Vehicle/MapUtilts.ts";
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom.js';
import {defaults as defaultInteractions} from 'ol/interaction/defaults.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import {defaults as defaultControls} from 'ol/control/defaults.js';

export interface BaseLayer {
    type:String,
    name:string,
    default:Boolean,
    urls:Array<string>,
    id: String,
    value: String,
    layerName: String,
    checked: Boolean,
    spread: Boolean,
}

const props = defineProps({
    title: String,
    count: {
        type: Number,
        default: 0,
    },
    baseLayers:{
        type: Array<BaseLayer>,
        default: []
    },
    mapcenter:{
        type:Array<number>,
        default: [120.064839, 32.548857],
    },
    zoom:{
        type:Number,
        default:8,
    },
    projection:{
        type:String,
        default:'EPSG:4326',
    },
    heightdata:Number,
});

const initMap = () => {
    const baselayersConfig = props.baseLayers;
    let baselayers:Array<TileLayer> = new Array<TileLayer>();
    for(let b in baselayersConfig) {
        let layer:TileLayer = new TileLayer();
        let cf = baselayersConfig[b];
        if(cf.default) {
            switch(cf.type) {
                case "xyz":
                    for(let url in cf.urls) {
                        layer = CreateLayer(cf.urls[url],cf.layerName+url);
                        //baselayers.push(layer);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    let defaultBaseLayerName = baselayersConfig.find(g => g.default)?.value;
    const base_config11 = getBaseLayer(defaultBaseLayerName);
    let lalll = CreateLayer(base_config11?.urls[0],"overviewlayer");

    const overviewMapControl = new OverviewMap({
        className: 'ol-overviewmap ol-custom-overviewmap',
        layers: [
            lalll
        ],
        collapseLabel: '\u00BB',
        label: '\u00AB',
        collapsed: false,
    });
    const map = new Map({
        controls: defaultControls().extend([overviewMapControl]),
        interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
        target: 'map_contain',
        layers: baselayers,
        view: new View({
            projection: 'EPSG:4326',
            center: props.mapcenter,
            zoom: props.zoom,
        }),
    });
    map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
    });
    map.on('click', function (evt) {
        //displayFeatureInfo(evt.pixel);
    });
    return map;
};
const CreateVector = (layername:String) => {
    const style1 = new Style({
        fill: new Fill({
            color: '#eeeeee',
        }),
    });
    const vectorLayer = new VectorLayer({
        background: '#1a2b39',
        source: new VectorSource({
            url: 'https://openlayers.org/data/vector/ecoregions.json',
            format: new GeoJSON(),
        }),
        style: function (feature) {
            const color = feature.get('COLOR') || '#eeeeee';
            if(style1) {
                let sg = style1.getFill();
                sg?.setColor(color);
            }
            return style1;
        },
    });
    vectorLayer.set("name",layername);
    return vectorLayer;
};
const selectBaseLayer = ref("vec_w");
const mapref = ref(null);
const maprefwrap = ref(null);
let map:any = {} ;
onMounted(() => { 
    if(mapref.value){
        //console.log(mapref.value.Dom());
        //(mapref.value as any).style = `height: ${window.innerHeight-100}px`;
        //(maprefwrap.value as any).style = `height: ${window.innerHeight-100}px`;
        // (mapref.value as any).style = `height: ${1222}px`;height
        (mapref.value as any).style = `height: ${props.heightdata}px`;
        (maprefwrap.value as any).style = `height: ${props.heightdata}px`;
    }
    map = initMap();
    handleClick({
        target: {
            value: "vec_w",
            checked: true,
        }
    });
    console.log('当前屏幕宽度：', window.innerWidth);
    console.log('当前屏幕高度：', window.innerHeight);
});
const baseLayers = getBaseLayers();
const removeLayerByNames = (layerNames:any, map:any) => {
  layerNames.forEach((layerName:any) => {
    removeLayerByName(layerName, map);
  });
};
const handleClick = (obj:any) => {
    removeLayerByName(obj.target.value, map);
    removeLayerByNames(["tdtImg0", "tdtVec0", "tdtImg1", "tdtVec1", "bdLayer", "gdLayer", "arcgisWorld", "arcgisImg"],map);
    if (obj.target.checked) {
        const base_config = getBaseLayer(obj.target.value);
        switch(obj.target.value) {
        case 'vec_w':
            {
                addTDTVecLayer(map,base_config?.urls[0],base_config?.layerName+"0");
                addTDTVecLayer(map,base_config?.urls[1],base_config?.layerName+"1")
            }
            break;
        case 'img_w':
            {
                addTDTImgLayer(map,base_config?.urls[1],base_config?.layerName+"1")
                addTDTImgLayer(map,base_config?.urls[0],base_config?.layerName+"0")
            }
            break;
        case 'bd':
            addBdLayer(map,base_config?.urls[0],base_config?.layerName)
            break;
        case 'gd':
            addGdLayer(map,base_config?.urls[0],base_config?.layerName)
            break;
        case 'arcgisWorld':
            addArcGISWorld(map,base_config?.urls[0],base_config?.layerName)
            break;
        case 'arcgisImg':
            addArcGISImg(map,base_config?.urls[0],base_config?.layerName)
            break;
        }
    }
};
const AddClick = () => {
    let pointlayer = CreateVector("ecoregionsLayer");
    map.addLayer(pointlayer);
};
const RemoveClick = () => {
    RemoveLayer("ecoregionsLayer");
};
const RemoveLayer = (layername:string) => {
    let ls = map.getLayers().getArray();
    for(let i = 0; i< ls.length;i++) {
        if(ls[i].get("name") ==layername) {
            map.removeLayer(ls[i]);
        }
    }
};
// import KML from 'ol/format/KML.js';
import HeatmapLayer from 'ol/layer/Heatmap.js';
let blur = ref("10");
let radius = ref("10")
const CreateHeatmap = (name:string)=> {
    const vector = new HeatmapLayer({
        source: new VectorSource({
            url: 'https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
            format: new KML({
                extractStyles: false,
            }),
        }),
        blur: parseInt(blur.value, 10),
        radius: parseInt(radius.value, 10),
        weight:  (feature) => {
            const name = feature.get('name');
            const magnitude = parseFloat(name.substr(2));
            return magnitude - 5;
        },
    });
    vector.set("name",name);
    return vector;
};
const AddHeatmapLayer=() => {
    if(!CheckMapLayerExsit("HeatmapLayer")) {
        let pointlayer = CreateHeatmap("HeatmapLayer");
        map.addLayer(pointlayer);
    }
};
const RemoveHeatmapLayer=() => {
    RemoveLayer("HeatmapLayer");
};
const CheckMapLayerExsit = (layername:string) => {
      let ls = map.getLayers().getArray();
    for(let i = 0; i< ls.length;i++) {
        if(ls[i].get("name") ==layername) {
            return true;
        }
    }
    return false;
};
const CreateEarthQuakes =(layername:string) => {
    const styleCache:any = {};
    const styleFunction =  (feature:any) => {
        const name = feature.get('name');
        const magnitude = parseFloat(name.substr(2));
        const radius = 5 + 20 * (magnitude - 5);
        let style = styleCache[radius];
        if (!style) {
            style = new Style({
            image: new CircleStyle({
                radius: radius,
                fill: new Fill({
                color: 'rgba(255, 153, 0, 0.4)',
                }),
                stroke: new Stroke({
                color: 'rgba(255, 204, 0, 0.2)',
                width: 1,
                }),
            }),
            });
            styleCache[radius] = style;
        }
        return style;
    };
    const vector = new VectorLayer({
            source: new VectorSource({
            url: 'https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
            format: new KML({
                extractStyles: false,
            }),
        }),
        style: styleFunction,
    });
    vector.set("name", layername);
    return vector;
};

const AddEarthQuakes = () => {
    if(!CheckMapLayerExsit("CreateEarthQuakes")) {
        let layer = CreateEarthQuakes("CreateEarthQuakes");
        map.addLayer(layer);
    }
};
const RemoveEarthQuakes=() => {
    RemoveLayer("CreateEarthQuakes");
};
import {jsPDF} from 'jspdf';
const ExportMap = () => {
    const dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148],
    };
    const resolutions = {
        a0: "72",
        a1: "150",
        a2: "300"
    };
    const format = "a0";
    const resolution = Number(resolutions["a0"]);
    const dim = dims[format];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);
    const size = map.getSize();
    const viewResolution = map.getView().getResolution();
    
      const mapCanvas:any = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      const mapContext:any = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix,
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        },
      );
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);
      const pdf = new jsPDF('landscape', undefined, format);
      pdf.addImage(mapCanvas.toDataURL('image/jpeg'),'JPEG',0,0,dim[0]*2,dim[1]*2,);
      pdf.save('map.pdf');
   
};
import {getRenderPixel} from 'ol/render.js';
import ImageTile from 'ol/source/ImageTile.js';
const AddSwipe = ()=> {
    // const aerial =  CreateVector("swipelayer");
    // const swipe:any = document.getElementById('swipe');
    // aerial.on('prerender', function (event:any) {
    //     const ctx = event.context;
    //     const mapSize = map.getSize();
    //     const width = mapSize[0] * (Number(swipe.value) / 100);
    //     const tl = getRenderPixel(event, [width, 0]);
    //     const tr = getRenderPixel(event, [mapSize[0], 0]);
    //     const bl = getRenderPixel(event, [width, mapSize[1]]);
    //     const br = getRenderPixel(event, mapSize);

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.moveTo(tl[0], tl[1]);
    //     ctx.lineTo(bl[0], bl[1]);
    //     ctx.lineTo(br[0], br[1]);
    //     ctx.lineTo(tr[0], tr[1]);
    //     ctx.closePath();
    //     ctx.clip();
    // });

    // aerial.on('postrender', function (event:any) {
    //     const ctx = event.context;
    //     ctx.restore();
    // });

    // swipe.addEventListener('input', function () {
    //     map.render();
    // });
};
</script>
<template>
    <div ref="maprefwrap"  class="map-wrap">
        <!-- <div class="map-control-swipe">
            <input class="map-control-add-input-swipe" id="swipe" type="range" style="width: 100%">
        </div> -->
        <div ref="mapref" class="map-wrap-container" id="map_contain" ></div>
        <div id="layer-container">
            <h2 class="layer-head">图层资源</h2>
            <ul id="layer-tree">
                <li class="tree-node" v-for="children in baseLayers" >
                    <input type="radio" :id="children.id"  name="contact" v-model="selectBaseLayer"  @click="handleClick" :value="children.value">
                    <label style="color: black;" :for="children.id">{{children.name}}</label><br>
                </li> 
            </ul>
        </div>
        <div class="map-control-add">
            <input class="map-control-add-button" type="button" value="新增图层"  @click="AddClick"></input></br>
            <input class="map-control-add-button" type="button" value="删除图层"  @click="RemoveClick"></input>
            <input class="map-control-add-button" type="button" value="Heatmap" @click="AddHeatmapLayer"/>
            <input class="map-control-add-button" type="button" value="RemoveHeatmap" @click="RemoveHeatmapLayer"/>
            <input class="map-control-add-button" type="button" value="AddEarthquakes" @click="AddEarthQuakes"/>
            <input class="map-control-add-button" type="button" value="RemoveEarthquakes" @click="RemoveEarthQuakes"/>
            <input class="map-control-add-button" type="button" value="ExportMap" @click="ExportMap"/>
            <input class="map-control-add-button" type="button" value="AddSwipe" @click="AddSwipe"/>
        </div>
    </div>
   
</template>
<style scoped>
.map-wrap{
    width: 100%;
    height:100%;
    background-color: aliceblue;
    position: relative;
}
.map-wrap-container {
    width: 100%;
    height: 400px;
    border: 1px solid red;
}

#layer-container {
    position: absolute;
    top:0.5em;
    height: 200px;
    right: 0.5em;
    width: 15%;
    bottom: 5%;
    background: #fff;
    color: #fff;
    border-radius: 2.5px;
    border: 1px solid #ddd;
}

.layer-head {
    background: #16baaa;
    padding: 10px;
}
#layer-tree{
  padding: 10px 10px 10px 10px;

}
.tree-node {
    padding: 2px 5px;
}
.ol-overviewmap {
    left: 0.5em;
    bottom: 2em !important;
}
.map-control-add{
    display: block;
    position: absolute;
    top:0.5em;
    left:8.8em;
    background-color: cadetblue;
}
.map-control-add-button{
    padding: 5px;
    margin: 5px;
    background-color:#16baaa;
}
.map-control-swipe{
    /* display: block; */
    width: 100%;
    /* position: absolute; */
    top:15em;
    left:3em;
    background-color: cadetblue;
}
</style>
