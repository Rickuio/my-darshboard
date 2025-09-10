import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class UsersComponent implements OnInit {

  public serviceUsers = inject(UsersService);

  ngOnInit(): void {
    this.serviceUsers.loadingP();
  } 

}
