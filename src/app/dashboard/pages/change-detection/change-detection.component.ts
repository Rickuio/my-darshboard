import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-change-detection',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TitleComponent, JsonPipe],
  templateUrl: './change-detection.component.html',
})
export default class ChangeDetectionComponent { 

  public currentFamework = computed(
    () => `Change detection - ${ this.frameworkAsSignal().name }`
  );
  
  public frameworkAsSignal = signal({
    type: 'signal',
    name: 'Angular',
    released: 2026,
  });
  
  public frameworkAsProperty = {
    type: 'property',
    name: 'Angular',
    released: 2026,
  };

  constructor() {
    setTimeout(() => {
      this.frameworkAsProperty.name = 'React Property';
      this.frameworkAsSignal().name = 'React Signal';
      console.log('Hecho..');
    }, 3000);
  }

}
