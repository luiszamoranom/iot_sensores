import {Component, inject, OnInit} from '@angular/core';
import {HumedadService} from "../../services/humedad.service";
import {ResponseAPI} from "../../dtos/ResponseAPI";
import {interval, Subject, takeUntil} from "rxjs";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-humedad',
  standalone: true,
  imports: [],
  templateUrl: './humedad.component.html',
  styleUrl: './humedad.component.css'
})
export class HumedadComponent implements OnInit{
  // servicios para acceder a los datos del backend de las metricas
  private _humedadService = inject(HumedadService)
  protected _utilsService = inject(UtilsService)

  // datos del backend alojado en variables locales del componente
  protected humedad_masReciente: ResponseAPI|undefined = undefined
  protected humedad_promedio: number|undefined = undefined
  protected humedad_maxima: number|undefined = undefined
  protected humedad_minima: number|undefined = undefined
  private destroy$ = new Subject<void>();

  // cada vez que se inicialice el componente, cada medio segundo, se actualizaran los datos de dicha metrica
  ngOnInit() {
    interval(500).pipe(takeUntil(this.destroy$)).subscribe(() => {

      this._humedadService.fetchMasReciente().subscribe(
        response => this.humedad_masReciente = response
      )

      this._humedadService.fetchPromedio().subscribe(
        response => this.humedad_promedio = response
      )

      this._humedadService.fetchMaxima().subscribe(
        response => this.humedad_maxima = response
      )

      this._humedadService.fetchMinimo().subscribe(
        response => this.humedad_minima = response
      )
    })
  }

}
