import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../shared/components/header/header.component';
import { MenuComponent } from '../shared/components/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    HeaderComponent,
    MenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
