import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

import { TitleComponent } from '@shared/title/title.component';
import { User } from '../../../interfaces/req-res';
import { identity, switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  templateUrl: './user.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class UserComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private servicioUsers = inject(UsersService);

  public completeName = computed( () => this.userToSig()?.first_name + ' ' + this.userToSig()?.last_name);
  
  //public user = signal<User | undefined>(undefined);
  public userToSig = toSignal(
    this.route.params.pipe(
      // switchMap( params => this.servicioUsers.getUserById(params['id']))
      switchMap( ({id}) => this.servicioUsers.getUserById(id))
    )
  );

  public titleLabel = computed( () => {
    if (this.userToSig()) {
      return `User: ${this.userToSig()?.first_name} ${this.userToSig()?.last_name}`;
    }
    return 'No user data';
  });

  ngOnInit(): void {
    console.log('Entrando a ngOnInit');
    // this.route.params.subscribe(
    //   params => {
    //     console.log({serviceParams: params});
    //     this.servicioUsers.getUserById(params['id']);
    //   }
    // );
  } 
  

}
