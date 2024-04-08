import {Component, inject, OnInit} from '@angular/core';
import {HumedadService} from "../../services/humedad.service";
import {JsonPipe} from "@angular/common";
import {ResponseAPI} from "../../dtos/ResponseAPI";
import {interval, Subject, takeUntil} from "rxjs";
import {HumedadComponent} from "../humedad/humedad.component";

@Component({
  selector: 'app-lista-humedad',
  standalone: true,
  imports: [
    JsonPipe,
    HumedadComponent
  ],
  templateUrl: './lista-humedad.component.html',
  styleUrl: './lista-humedad.component.css'
})
export class ListaHumedadComponent implements OnInit{
  // servicio para acceder a los registros de la metrica
  private _humedadService = inject(HumedadService)

  // dato para almacenar los registros obtenidos del backend
  protected humedades : ResponseAPI[] = []
  private destroy$ = new Subject<void>();

  // al inicializar el componente, cada medio segundo, se obtendran nuevamente
  // los registros capturados desde el backend
  ngOnInit() {
    interval(500).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._humedadService.fetchAll().subscribe(
        response => this.humedades = response
      )
    })
  }
}
