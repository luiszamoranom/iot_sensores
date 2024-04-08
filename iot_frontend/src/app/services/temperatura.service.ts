import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseAPI} from "../dtos/ResponseAPI";

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  private httpCliente: HttpClient = inject(HttpClient)
  private baseUrl = 'http://35.239.216.31:5030/api/temperatura';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  // obtener todos los registros de la metrica
  fetchAll(): Observable<ResponseAPI[]> {
    return this.httpCliente.get<any>(`${this.baseUrl}`, this.httpOptions)
  }

  // obtener el registro mas reciente de la metrica
  fetchMasReciente(): Observable<ResponseAPI> {
    return this.httpCliente.get<any>(`${this.baseUrl}/mas_reciente`, this.httpOptions)
  }

  // obtener el registro promedio de la metrica
  fetchPromedio(): Observable<number> {
    return this.httpCliente.get<any>(`${this.baseUrl}/promedio`, this.httpOptions)
  }

  // obtener el registro con el valor máximo de la metrica
  fetchMaxima(): Observable<number> {
    return this.httpCliente.get<any>(`${this.baseUrl}/maxima`, this.httpOptions)
  }

  // obtener el registro con el valor minimo de la metrica
  fetchMinimo(): Observable<number> {
    return this.httpCliente.get<any>(`${this.baseUrl}/minima`, this.httpOptions)
  }
}
