import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { User, UserResponse, UsersResponse } from '../interfaces/req-res';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject( HttpClient );

  #state = signal<State>({
    loading: true,
    users: [],
  });

  public usersP = computed( () => this.#state().users );  
  public loadingP = computed( () => this.#state().loading );  

  constructor() {
    console.log('Iniciando users.service');
    const url = `https://reqres.in/api/users`;
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });
    this.http.get<UsersResponse>(url, {headers})
    .pipe(delay(1500))
    .subscribe( 
      res => {
        console.log({Respuesta: res});
        this.#state.set({
          loading: false,
          users: res.data,
        });
      }
    );
  }

  getUserById(id: string) {
    const url = `https://reqres.in/api/users/${id}`;
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });
    return this.http.get<UserResponse>(url, {headers})
    .pipe(
      delay(1500),
      map (resp => resp.data)
      // map( resp => {
      //   const infoUser = resp.data;
      //   console.log({infoUser});
      // })
    );
  }

}
