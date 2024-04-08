import {Component, inject, OnInit} from '@angular/core';
import {LuminosidadService} from "../../services/luminosidad.service";
import {ResponseAPI} from "../../dtos/ResponseAPI";
import {interval, Subject, takeUntil} from "rxjs";
import {LuminocidadComponent} from "../luminocidad/luminocidad.component";

@Component({
  selector: 'app-lista-luminosidad',
  standalone: true,
  imports: [
    LuminocidadComponent
  ],
  templateUrl: './lista-luminosidad.component.html',
  styleUrl: './lista-luminosidad.component.css'
})
export class ListaLuminosidadComponent implements OnInit{
  // servicio para acceder a los registros de la metrica
  private _luminosidadService = inject(LuminosidadService)

  // dato para almacenar los registros obtenidos del backend
  protected luminosidades : ResponseAPI[] = []
  private destroy$ = new Subject<void>();

  // al inicializar el componente, cada medio segundo, se obtendran nuevamente
  // los registros capturados desde el backend
  ngOnInit() {
    interval(500).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._luminosidadService.fetchAll().subscribe(
        response => this.luminosidades = response
      )
    })
  }
}
