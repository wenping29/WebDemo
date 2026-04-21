import { Tile as TileLayer } from 'ol/layer';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { get as getProjection } from 'ol/proj';
import { getWidth, getTopLeft } from 'ol/extent';
import { Map, View } from 'ol';
import { get } from 'ol/proj';
import { XYZ } from 'ol/source';
import WMTS from 'ol/source/WMTS.js';
import TileImage from 'ol/source/TileImage.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';

const projection = get('EPSG:4326');

// const getWMTSLayer = (url:string, layer:any, title:string, visible:boolean) => {
//     const epsg = 'EPSG:4326';
//     const projection = getProjection(epsg);
//     const projectionExtent = projection?.getExtent();
//     const size = getWidth(projectionExtent) / 256;
//     const length = 17;
//     const resolutions = new Array(length);
//     const matrixIds = new Array(length);
//     for (let i = 0; i < length; i += 1) {
//         const pow = Math.pow(2, i);
//         resolutions[i] = size / pow;
//         matrixIds[i] = i;
//     }
//     const source = new WMTS({
//         url: url,
//         layer: layer,
//         style: 'default',
//         crossOrigin: 'anonymous',
//         matrixSet: 'c',
//         format: 'tiles',
//         wrapX: true,
//         tileGrid: new WMTSTileGrid({
//             origin: getTopLeft(projectionExtent),
//             resolutions,
//             matrixIds,
//         }),
//     });
//     const tileLayer = new TileLayer({
//         source,
//         visible: visible,
//     });
//     return tileLayer;
// }
// const get_vec_c = (title:string, visible:boolean, key:string) => {
//     return [
//         getWMTSLayer('http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=' + key, 'vec', title, visible),
//         getWMTSLayer('http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=' + key, 'cva', title, visible)
//     ]
// }

/**
 * 添加百度地图
 * @param map：地图对象
 */
const addBdLayer = (map:any,url:any, layername:any) => {
  // 百度地图参数
  const resolutions = [];
  for (let z = 0; z < 19; ++z) {
    resolutions[z] = Math.pow(2, 18 - z);
  }
  let tilegrid = new TileGrid({
    origin: [0, 0],
    resolutions: resolutions
  });
  let source = new TileImage({
    //projection: projection,
    tileGrid: tilegrid,
    tileUrlFunction: function (tileCoord, pixelRatio, proj) {
      if (!tileCoord) {
        return "";
      }
      let z = tileCoord[0];
      let x = tileCoord[1];
      // var y = tileCoord[2];
      let y = -tileCoord[2] - 1;

      if (x < 0) {
        //x = "M" + (-x);
      }
      if (y < 0) {
        //y = "M" + (-y);
      }
      return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z +
        "&styles=pl&udt=20151021&scaler=2&p=1"
    },
    crossOrigin: 'anonymous'
  })
  let layer = new TileLayer({
    source: source
  })
  layer.set("name", layername);
  map.addLayer(layer);
}

const CreateLayer = (url:any,layername:any) => { 
  const TDTVecLayer = new TileLayer({
      //title: "天地图矢量图层",
      source: new XYZ({
          url: url,
          //attibutions: "天地图矢量",
          crossOrigin: "anoymous",
          wrapX: false
      }),
      
  })
  TDTVecLayer.set("name", layername)
  return TDTVecLayer;
}

/**
 * 加载天地图矢量
 * @param map：地图对象
 * @param url：地图服务地址
 */
const addTDTVecLayer = (map:any, url:any,layername:any) => {
  const layer = CreateLayer(url,layername);
  map.addLayer(layer);
}

/**
 * 加载天地图注记
 * @param map：地图对象
 * @param url：地图服务地址
 */
const addTDTCvaLayer = (map:any, url:any,layername:any) => {
  const layer = CreateLayer(url,layername);
  map.addLayer(layer)
}

/**
 * 加载ArcGIS影像
 * @param map：地图对象
 * @param url：地图服务地址
 */
const addArcGISImg = (map:any, url:any,layername:any) => {
  const layer = CreateLayer(url,layername);
  map.addLayer(layer);
}

/**
 * 加载ArcGIS世界地图
 * @param map：地图对象
 * @param url：地图服务地址
 */
const addArcGISWorld=(map:any, url:any,layername:any)=> {
  const layer = CreateLayer(url,layername);
  map.addLayer(layer);
}

/**
 * 加载高德地图
 * @param map：地图对象
 * @param url：地图服务地址
 */
const addGdLayer = (map:any, url:any,layername:any) => {
  const layer = CreateLayer(url,layername);
  map.addLayer(layer)
}
/**
 * 加载天地图影像
 * @param map：地图对象
 * @param url：地图服务地址
 */
const  addTDTImgLayer = (map:any, url:any,layername:any) => {
  const TDTVecLayer = CreateLayer(url,layername);
  map.addLayer(TDTVecLayer)
}

/**
 * 移除目标图层
 * @param layerName：图层名称
 */
const removeLayerByName = (layerName:any, map:any) => {
  const layers = map.getLayers().getArray();
  for(let i = 0; i < layers.length; i++){
    if (layers[i].get("name") == layerName)
    {
      map.removeLayer(layers[i]);
    }
  };
}

export { CreateLayer,addArcGISWorld,removeLayerByName,addArcGISImg,addTDTCvaLayer,addTDTVecLayer,addTDTImgLayer,addGdLayer,addBdLayer };