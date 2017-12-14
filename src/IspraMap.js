
import React, { Component } from 'react';


import Map from 'ol/map';

import proj from 'ol/proj';
import View from 'ol/view';

import Tile from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import TileArcGISRest from 'ol/source/tilearcgisrest';

import Circle from 'ol/style/circle';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';

import GeoJSON from 'ol/format/geojson';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import Projection from 'ol/proj/projection';

import OSM from 'ol/source/osm';
    
class IspraMap extends Component{


    constructor(){
        super();
        this.image = new Circle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: 'red', width: 1 })
        });

        this.styles = {
            'Point': new Style({
                image: this.image
            })
        };

    }

    render(){
        return(
            <div>
                <div id="map" className="map"></div>
            </div>
        )
    }

    componentDidMount() {
        this.map = new Map({
            target: 'map',
            layers: [
                new Tile({
                    source: new OSM()
                })//,
                //new Tile({
                //    source: new TileWMS({
                //        url:"http://193.206.192.107/geoserver/nnb/wms",
                //        params:{
                //            "LAYERS":["nnb:geometrie"]
                //        }
                //    })
                //})//,
                //new Tile({
                //    source: new TileArcGISRest({
                //        url:"http://www.geoservices.isprambiente.it/arcgis/services/LimitiAmministrativi/Limiti_Amministrativi_Regionali_2011/MapServer"
                //    })
                //}
            ],
            view: new View({
                center: proj.fromLonLat(this.props.center),
                zoom: this.props.zoom
            })
        });

      
    }

    addLayer(layer){
        this.map.addLayer(layer);
    }
    
    addJsonLayer(data){

        var ggreader = new GeoJSON({ projection: 'EPSG:4326' });
        var feats = ggreader.readFeatures(data);

        feats.forEach(function (feat) {
            var epsg_4326 = new Projection({ code: "EPSG:4326" });
            var epsg_3857 = new Projection({ code: "EPSG:3857" });
            var newgeom = feat.getGeometry().transform(epsg_4326, epsg_3857);
            feat.setGeometry(newgeom);
        });

        var vectorSource = new VectorSource({
            features: feats
        });
        
        var vectorLayer = new VectorLayer({
            source: vectorSource,
            style: (feature)=>{
                return this.styles[feature.getGeometry().getType()];

            }
        });

        this.map.addLayer(vectorLayer);
    }
}

export default IspraMap;