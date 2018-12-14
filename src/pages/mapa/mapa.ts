import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  ILatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private googleMaps: GoogleMaps,private geolocation: Geolocation) {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    let config:any = {
      controls: {myLocationButton: true,zoom:true}
    };
    let map: GoogleMap = this.googleMaps.create(element,config);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      // Now you can add elements to the map like the marker
      let posicao: LatLng = new LatLng(-29.716810,-52.426058);//-29.716810, -52.426058

      // create CameraPosition
      let position: CameraPosition<ILatLng> = {
        target: posicao,
        zoom: 15,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);

      let configMarcacao:MarkerOptions = {
        position: new LatLng(-29.716810,-52.426058),
        title: 'Exemplo'
      };

      map.addMarker(configMarcacao).then((marcacao:Marker)=>{
        marcacao.showInfoWindow();
        marcacao.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
          alert("OK, Marcação clicada!");
        });
      });

    });
  }

  addMarcacao(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);

    let configMarcacao:MarkerOptions = {
      position: new LatLng(-29.716844, -52.427760),
      title: 'Teste Marcação'
    };

    map.addMarker(configMarcacao).then((marcacao:Marker)=>{
      marcacao.showInfoWindow();
      marcacao.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
        alert("OK, Marcação clicada!");
      });
    });

  }

  posicaoAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      let element: HTMLElement = document.getElementById('map');
      let map: GoogleMap = this.googleMaps.create(element);

      let posicao: LatLng = new LatLng(resp.coords.latitude,resp.coords.longitude);

      // create CameraPosition
      let position: CameraPosition<ILatLng> = {
        target: posicao,
        zoom: 16,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);



    }).catch((error) => {
      alert("Erro " + error.message);
    });
  }



}
