import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent
{
  @Input() drawer: MatDrawer | null = null;

  private router = inject(Router);

  navigateToInicio()
  {
    this.router.navigate(['/inicio']);
    this.drawer?.close();
  }

  navigateToNormativa()
  {
    this.router.navigate(['/normativa']);
    this.drawer?.close();
  }

  navigateToPlantillas()
  {
    this.router.navigate(['/plantillas']);
    this.drawer?.close();
  }

  navigateToClasificaciones()
  {
    this.router.navigate(['/clasificaciones']);
    this.drawer?.close();
  }

  navigateToLigaInsular()
  {
    this.router.navigate(['/liga-insular']);
    this.drawer?.close();
  }

  navigateToLigaRegional()
  {
    this.router.navigate(['/liga-regional']);
    this.drawer?.close();
  }

  navigateToCopaRegional()
  {
    this.router.navigate(['/copa-regional']);
    this.drawer?.close();
  }
}
