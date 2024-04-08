import {Component, inject, OnInit} from '@angular/core';
import {TemperaturaService} from "../../services/temperatura.service";
import {LuminosidadService} from "../../services/luminosidad.service";
import {ResponseAPI} from "../../dtos/ResponseAPI";
import {interval, Subject, takeUntil} from "rxjs";
import {TemperaturaComponent} from "../temperatura/temperatura.component";

@Component({
  selector: 'app-lista-temperatura',
  standalone: true,
  imports: [
    TemperaturaComponent
  ],
  templateUrl: './lista-temperatura.component.html',
  styleUrl: './lista-temperatura.component.css'
})
export class ListaTemperaturaComponent implements OnInit{
  // servicio para acceder a los registros de la metrica
  private _temperaturaService = inject(TemperaturaService)

  // dato para almacenar los registros obtenidos del backend
  protected temperaturas : ResponseAPI[] = []
  private destroy$ = new Subject<void>();

  // al inicializar el componente, cada medio segundo, se obtendran nuevamente
  // los registros capturados desde el backend
  ngOnInit() {
    interval(500).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._temperaturaService.fetchAll().subscribe(
        response => this.temperaturas = response
      )
    })
  }
}
