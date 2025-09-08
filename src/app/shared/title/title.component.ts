import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <h1 class="text-4xl text-center mt-4 mb-2">{{ titulo }}</h1>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TitleComponent { 
  @Input({ required: true, alias: 'title'}) titulo!: string;
  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
