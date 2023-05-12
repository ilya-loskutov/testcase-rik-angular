import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GridValues } from '../models/grid-values';

@Injectable({
  providedIn: 'root'
})
export class GridBuilderService {
  constructor() { }

  get gridValues$(): Observable<GridValues> {
    return this._gridValues$;
  }

  private _gridValues$: BehaviorSubject<GridValues> = new BehaviorSubject<GridValues>({
    cols: 1,
    rowHeight: '56px'
  });
}
