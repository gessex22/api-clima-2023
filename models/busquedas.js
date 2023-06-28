const { default: axios } = require("axios");
const fs = require('fs');

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    this.readDb();
  }


  get historyCapitalizado(){


    return this.historial.map(lugar => {
      let palabras = lugar.split(' ')
      palabras = palabras.map( p => p[0].toUpercase()+ p.substring(1))
      
      return palabras.join(' ')
    })
  }
  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'languaje': "es",
    };
  }

  get paramasWheather() {
    return {
      appid: process.env.OPENWHEATHER,
      lang: "es",
      units: "metric",
    };
  }

  async ciudad(lugar = "") {
    try {
      const intance = await axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const resp = await intance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {}

    if (this.error) console.log(this.error);
    return [];
  }

  async climaLugar(lat = 0, lon = 0) {
    //intance axios
    try {
      const query = await axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramasWheather, lat, lon },
      });
      const resp = await query.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(lugar = "") {
    if (this.historial.includes(lugar)) {
      return;
    }
    this.historial = this.historial.splice(0,5)
    this.historial.unshift(lugar);
  }

  saveDb(){

    const payload ={
      historial : this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))

  }
  readDb(){
    
    if (!fs.existsSync(this.dbPath)) return ;

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
    const data = JSON.parse(info)

    this.historial = data.historial;

    

  }

}
module.exports = Busquedas;
