import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import {catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private urlEndPoint: string = environment.domain_backend + '/api/mail';

  constructor(private http: HttpClient) { }

  enviarEmail(to, subject, body){
    return this.http.post(`${this.urlEndPoint}/enviar`, {},{responseType: 'text',
      params: {
        'to': to,
        'subject': subject,
        'body': body
      },
    },).pipe(
      res => {return res},
      catchError(e =>{
        console.error(e.error.message);
        swal.fire('Error al enviar una notificación.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    )
  }

  enviarEmailBroadcast(subject, body){
    return this.http.post(`${this.urlEndPoint}/enviarBroadcast`, {},{responseType: 'text',
      params: {
        'subject': subject,
        'body': body
      },
    },).pipe(
      res => {return res},
      catchError(e =>{
        console.error(e.error.message);
        swal.fire('Error al enviar una notificación.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    )
  }
}
