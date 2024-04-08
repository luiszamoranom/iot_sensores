import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // metodo de utilidad, utilizado en los componentes con metricas
  // para mostrar sólo dos decimales y no más
  aproximarADosDecimales(numero: number|undefined): number|undefined {
    if(numero){
      return parseFloat((numero).toFixed(2));
    }
    return undefined
  }
}
