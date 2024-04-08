import { Routes } from '@angular/router';
import {DashboardSensoresComponent} from "./features/dashboard-sensores/dashboard-sensores.component";
import {ListaTemperaturaComponent} from "./features/lista-temperatura/lista-temperatura.component";
import {ListaHumedadComponent} from "./features/lista-humedad/lista-humedad.component";
import {ListaLuminosidadComponent} from "./features/lista-luminosidad/lista-luminosidad.component";

export const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch:'full'},
  {path:'dashboard', component: DashboardSensoresComponent},
  {path:'temperatura', component: ListaTemperaturaComponent},
  {path:'humedad', component: ListaHumedadComponent},
  {path:'luminosidad', component: ListaLuminosidadComponent},
];
