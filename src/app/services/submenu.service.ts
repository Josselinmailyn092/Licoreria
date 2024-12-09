import { Component, Injectable } from '@angular/core';
import path from 'path';


@Injectable({
  providedIn: 'root'
})
export class SubmenuService {
private subMenuItems =[
  {
    label:'Inicio',
    path:'/home',
    subMenu: []
  },
  
  {
    label :'Licores',
    path: '/licores',
    subMenu:[
        {label:'Vinos',path :'/vinos'},
        {label:'Cerveza',path :'/cerveza'},
        {label:'Whiskey',path :'/whiskey'},
        {label:'Brandy',path :'/brandy'},
        {label:'Vodka',path :'/vodka'},
        {label:'Tequila',path :'/tequila'},
        {label:'Gin',path :'/gin'}      
    ]
  },

  //confiteria submenu 
  {
    label:'Confiteria',
    path:'/confiteria',
    subMenu:[
      {label:'GALLETAS', path:'/confiteria/galletas'},
      {label:'CHOCOLATES', path:'/confiteria/chocolates'},
      {label:'CHUPETES', path:'/confiteria/chupetes'},
      {label:'GOMITAS', path:'/confiteria/gomitas'},
      {label:'CARAMELOS', path:'/confiteria/caramelos'},
      {label:'CHICLE', path:'/confiteria/chicle'},
      {label:'SNAKS', path:'/confiteria/snaks'}
    ]

  },
  {
    label:'Promociones',
    path:'/promociones',
    subMenu: []
  },
  {
    label:'Nosotros',
    path:'/nosotros',
    subMenu: []
  },
  {
    label:'Contacto',
    path:'/contacto',
    subMenu: []
  },
];

geSubMenuItems() {
  return this.subMenuItems;
}
}
