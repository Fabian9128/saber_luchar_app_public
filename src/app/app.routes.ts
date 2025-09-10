import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { InicioComponent } from './shared/components/inicio/inicio.component';
import { NormativaComponent } from './shared/components/normativa/normativa.component';
import { PlantillasComponent } from './shared/components/plantillas/plantillas.component';
import { RankingComponent } from './shared/components/ranking/ranking.component';
import { LigaInsularComponent } from './shared/components/liga-insular/liga-insular.component';
import { LigaRegionalComponent } from './shared/components/liga-regional/liga-regional.component';
import { CopaRegionalComponent } from './shared/components/copa-regional/copa-regional.component';

export const routes: Routes =
[
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'normativa', component: NormativaComponent },
      { path: 'plantillas', component: PlantillasComponent },
      { path: 'clasificaciones', component: RankingComponent },
      { path: 'liga-insular', component: LigaInsularComponent },
      { path: 'liga-regional', component: LigaRegionalComponent },
      { path: 'copa-regional', component: CopaRegionalComponent }
    ]
  }
];
