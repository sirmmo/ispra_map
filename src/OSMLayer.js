import Layer from './Layer';

import OSM from 'ol/source/osm';
import Tile from 'ol/layer/tile';

class OSMLayer extends Layer{
    render(){
        return false;
    }

    getLayer(){
        console.log("OSMLayer");
        return new Tile({
            source: new OSM()
        })
    }
}

export default OSMLayer;