import 'react';

import './main.css';
import './sass.scss';
import 'purecss';

import component from './component';
// import button from './button';

document.body.appendChild(component());
// document.body.appendChild(button());
// 
// console.log(process.env.MODE); // <-- this was set in the setFreeVariable method in webpack