
import React, { useEffect, useRef, useState } from 'react';
import imgg from "./Asset/logo.svg";
import imgg_close from "./Asset/logo_close.svg";
import "./layercontrol.css";
export default function LayerControl({BaseLayer, onChangeBaseLayer}) {
    const LayerListIcon = "";
    const [layerListPanelVisible, setLayerListPanelVisible] = useState(false);
    function handleLayerListPanelVisible() {
        setLayerListPanelVisible(!layerListPanelVisible);
    }
    const layerlist = (BaseLayer.map(g => {
        return {
            id: g.id,
            basetype: g.basetype,
            name: g.name,
            type: g.type,
            isBaseLayer: g.isBaseLayer,
        };
    }));
    const LayerImgClick = (l) => {
      console.log("LayerImgClick");
      onChangeBaseLayer(l);
      setLayerListPanelVisible(!layerListPanelVisible);
    }
    function GetLayers(list) {
        return list.map(layer => {
            return (
                <div className={!layer.isBaseLayer ? "layer-list-item":"layer-list-item layer-list-item-select"} onClick={(e)=> {LayerImgClick(layer)}} >
                    <span>{ layer.name }</span>
                    <img src= {layer.isBaseLayer ?imgg:imgg_close } onClick={(e)=> {LayerImgClick(layer)}}/> 
                </div>  
            );

        })
    }
    function GetView() {
        if(layerListPanelVisible) {
            return (
            <div class="layer-list-view" > 
                <div class="layer-list-herder">
                    <span>业务图层列表</span>
                </div>
                <div class="layer-list-content">
                    {GetLayers(layerlist)}
                </div>
            </div>);
        }
    }
    return (
        <div class="layer-list">
            <div class="layer-list-icon" onClick={handleLayerListPanelVisible}>
                <img src={LayerListIcon} />    
            </div>
            {GetView()}
        </div>
      );
}