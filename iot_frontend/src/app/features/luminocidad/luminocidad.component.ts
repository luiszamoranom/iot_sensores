import {Component, inject, OnInit} from '@angular/core';
import {LuminosidadService} from "../../services/luminosidad.service";
import {ResponseAPI} from "../../dtos/ResponseAPI";
import {interval, Subject, takeUntil} from "rxjs";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-luminocidad',
  standalone: true,
  imports: [],
  templateUrl: './luminocidad.component.html',
  styleUrl: './luminocidad.component.css'
})
export class LuminocidadComponent implements OnInit{
  // servicios para acceder a los datos del backend de las metricas
  private _luminosidadService = inject(LuminosidadService)
  protected _utilsService = inject(UtilsService)

  // datos del backend alojado en variables locales del componente
  protected luminosidad_masReciente: ResponseAPI|undefined = undefined
  protected luminosidad_promedio: number|undefined = undefined
  protected luminosidad_maxima: number|undefined = undefined
  protected luminosidad_minima: number|undefined = undefined
  private destroy$ = new Subject<void>();

  // cada vez que se inicialice el componente, cada medio segundo, se actualizaran los datos de dicha metrica
  ngOnInit() {
    interval(500).pipe(takeUntil(this.destroy$)).subscribe(() => {

      this._luminosidadService.fetchMasReciente().subscribe(
        response => this.luminosidad_masReciente = response
      )

      this._luminosidadService.fetchPromedio().subscribe(
        response => this.luminosidad_promedio = response
      )

      this._luminosidadService.fetchMaxima().subscribe(
        response => this.luminosidad_maxima = response
      )

      this._luminosidadService.fetchMinimo().subscribe(
        response => this.luminosidad_minima = response
      )
    })
  }
}
