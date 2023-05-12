import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { GridValues } from './models/grid-values';
import { GridBuilderService } from './services/grid-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testcase-rik-angular';

  constructor(
    private gridBuilder: GridBuilderService
  ) { }

  get gridValues$(): Observable<GridValues> {
    return this.gridBuilder.gridValues$;
  }
}
