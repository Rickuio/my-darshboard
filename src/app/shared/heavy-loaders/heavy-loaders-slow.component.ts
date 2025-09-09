import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [NgClass],
  template: `
    <section [ngClass]="['w-full h-[180px]', cssClass]">
      Heavy Loader Slow
    </section>
  `
})
export class HeavyLoadersSlowComponent {

  @Input({ required: true}) cssClass!: string;

  constructor() {
    console.log('HeavyLoader Component');
    const start = Date.now();
    while( Date.now() - start < 2500) {
      console.log('Termino bloqueo!')
    }
  }

}
