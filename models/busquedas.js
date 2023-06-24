const { default: axios } = require("axios");

class Busquedas {
  historial = ["bogota", "rio-de-janeiro", "caracas"];

  constructor() {}

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'languaje': "es"
    };
  }

  async ciudad(lugar = "") {
    try {
      const intance = await axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox ,
      });
      const resp = await intance.get();
      return resp.data.features.map( lugar => ({
        id : lugar.id,
        nombre : lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
        
      }))
      
    } catch (error) {}

    if (this.error) console.log(this.error);
    return [];
  }
}

module.exports = Busquedas;
