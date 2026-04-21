
const BaseLayerConfig = () =>{
return[
        //  {
        //     id: "layer-6",
        //     name: "OGCMapTile",
        //     url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
        //     type: "OGCMapTile",
        //     isBaseLayer: false,
        //     basetype: "single",
        //   },
          {
            id: "layer-7-",
            name: "天地图卫星图",
            url: [
              'http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7',
              'http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7'
            ], 
            type: "XYZ",
            basetype: "group",
            isBaseLayer: true,
          },{
            id: "layer-9-",
            name: "天地图街道图",
            url: [
              'http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7',
              'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7',
            ],
            type: "XYZ",
            isBaseLayer: false,
            basetype: "group",
          },{
            id: "layer-11-",
            name: "天地图地形图",
            url: [
              "http://t{0-7}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7",
              'http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=844ad63f51aa67a22b10976bb0a043a7'
          ], 
            type: "XYZ",
            basetype: "group",
            isBaseLayer: false,
          },{
            id: "layer-12",
            name: "arcgis影像",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },{
            id: "layer-13",
            name: "arcgis街道",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },
          {
            id: "layer-21",
            name: "Physical_Map",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },
          {
            id: "layer-22",
            name: "World_Map",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },
          {
            id: "layer-23",
            name: "Topo_Map",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },
          {
            id: "layer-25",
            name: "Shaded_Relief",
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', 
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          },
          // {
          //   id: "layer-14",
          //   name: "谷歌影像",
          //   url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', 
          //   type: "XYZ",
          //   basetype: "single",
          //   isBaseLayer: false,
          // },{
          //   id: "layer-15",
          //   name: "谷歌街道",
          //   url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', 
          //   type: "XYZ",
          //   basetype: "single",
          //   isBaseLayer: false,
          // },
          {
            id: "layer-16",
            name: "高德影像",
            url: [
              "http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
              'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
            ],
            type: "XYZ", 
            basetype: "group",
            isBaseLayer: false,
          },{
            id: "layer-17",
            name: "高德街道",
            url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
            type: "XYZ",
            basetype: "single",
            isBaseLayer: false,
          }
    ];
  }
export default  BaseLayerConfig;


 