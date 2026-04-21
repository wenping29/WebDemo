
const layerconfigs= () => {
    return  [{
                name: "天地图矢量",
                layerType:"baselayer",
                type:"xyz",
                default: true,
                urls: [
                    "https://t5.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b4162ac2911ae0392798662d2ad1eda7",
                    "https://t5.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b4162ac2911ae0392798662d2ad1eda7"
                ],
                id: "11",
                value: "vec_w",
                layerName: "tdtVec",
                checked: false,
                spread: true,
            },{
                name: "天地图影像",
                layerType:"baselayer",
                type:"xyz",
                default: false,
                urls: [
                    
                    "https://t6.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b4162ac2911ae0392798662d2ad1eda7",
                    "https://t6.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b4162ac2911ae0392798662d2ad1eda7",
                ],
                id: "12",
                value: "img_w",
                layerName: "tdtImg",
                checked: false,
                spread: true,
            },{
                name: "高德地图",
                layerType:"baselayer",
                default: false,
                type:"xyz",
                urls: ["http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"],
                id: "2.3",
                value: "gd",
                checked: false,
                layerName: "gdLayer",
                spread: true,
            },{
                name: "世界地图",
                layerType:"baselayer",
                default: false,
                type:"xyz",
                id: "4.1",
                value: "arcgisWorld",
                urls: ["https://sampleserver5.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],
                checked: false,
                layerName: "arcgisWorld",
                spread: true,
            },{
                name: "卫星影像",
                layerType:"baselayer",
                id: "4.2",
                default: false,
                type:"xyz",
                value: "arcgisImg",
                urls: ["https://sampleserver5.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],
                checked: false,
                layerName: "arcgisImg",
                spread: true,
            },{
                name: "卫星影像",
                layerType:"featurelayer",
                id: "4.2",
                default: false,
                type:"geojson",
                value: "arcgisImg",
                urls: ["https://sampleserver5.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],
                checked: false,
                layerName: "arcgisImg",
                spread: true,
            }
    ];
}
enum LayerType {
   FeatureLayer= "featurelayer",
   BaseLayer = "baselayer"

}
const getBaseLayers = () => {
    let baseLayers = [];
    let layers = layerconfigs();
    for (let i = 0; i < layers.length; i++) {
        if(layers[i].layerType == LayerType.BaseLayer) {
            baseLayers.push(layers[i]);
        }
    }
    return baseLayers;
}
const getBaseLayer = (layerName:any) => {
    let baseLayers = getBaseLayers();
    for (let i = 0; i < baseLayers.length; i++) {
        let layer = baseLayers[i];
        if (layer.value == layerName) {
            return layer;
        }
    }
    return null;
}
export {
    layerconfigs,
    getBaseLayers,
    getBaseLayer,
}