import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { apiRoutes } from 'src/environments/environment'
import { Becario } from '../models/Becario'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBecarios(): Observable<Becario[]> {
    //return this.http.get('').pipe(map(val => val + 10))
    return this.http.get<Becario[]>(apiRoutes.apiBase + apiRoutes.becarios)
  }

  createBecario(becario: Becario): Observable<Becario> {
    let {
      nombre,
      apellidos,
      puesto,
      horario,
      fechaalta,
      responsables,
    } = becario
    return this.http.post<Becario>(apiRoutes.apiBase + apiRoutes.becarios, {
      nombre,
      apellidos,
      puesto,
      horario,
      fechaalta,
      responsables,
    })
  }

  editBecario(becario: Becario): Observable<Becario> {
    return this.http.put<Becario>(apiRoutes.apiBase + apiRoutes.becarios, {
      ...becario,
    })
  }

  deleteBecario(becario: Becario): Observable<any> {
    return this.http.delete<Becario>(
      apiRoutes.apiBase + apiRoutes.becarios + '/' + becario.id,
    )
  }
}
