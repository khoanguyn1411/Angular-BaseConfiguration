import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
interface check {
  readonly asd: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  readonly title = 'rhythm';
  public readonly asd$: Observable<number> = of(123)
}
