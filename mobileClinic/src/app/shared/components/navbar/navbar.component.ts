import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output()
  searchChanged = new EventEmitter<string>();

  constructor() {}

  onSearch(value: string): void {
    this.searchChanged.emit(value);
  }

}