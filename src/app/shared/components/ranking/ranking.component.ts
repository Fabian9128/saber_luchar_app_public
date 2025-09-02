import { Component, ViewChild, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { RankingService } from '../../../services/ranking.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit
{
  private rankingService = inject(RankingService);

  displayedColumns: string[] = ['jugador', 'puntos', 'exacto', 'dobles'];
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  selectedRanking: 'historica' | 'general' | 'insular' | 'regional' = 'general';
  title: string = 'CLASIFICACIÓN GENERAL';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit()
  {
    this.loadRanking();
  }

  loadRanking()
  {
    this.loading = true;
    this.title = this.getTitle(this.selectedRanking);

    this.rankingService.getPlayers(this.selectedRanking).subscribe(
    {
      next: (players) =>
      {
        if (this.selectedRanking === 'historica')
        {
          this.displayedColumns = ['jugador', 'total', 'y25_26', 'y24_25'];
          this.dataSource.data = players.map(p => (
          {
            jugador: p.jugador,
            total: p.puntos,
            y25_26: p.exacto,
            y24_25: p.dobles
          })).sort((a, b) =>
          {
            if (b.total !== a.total) return b.total - a.total;
            if (b.y25_26 !== a.y25_26) return b.y25_26 - a.y25_26;
            if (b.y24_25 !== a.y24_25) return b.y24_25 - a.y24_25;
            return a.jugador.localeCompare(b.jugador);
          });
        }
        else
        {
          this.displayedColumns = ['jugador', 'puntos', 'exacto', 'dobles'];
          this.dataSource.data = players.sort((a, b) =>
          {
            if (b.puntos !== a.puntos) return b.puntos - a.puntos;
            if (b.exacto !== a.exacto) return b.exacto - a.exacto;
            if (b.dobles !== a.dobles) return b.dobles - a.dobles;
            return a.jugador.localeCompare(b.jugador);
          });
        }

        setTimeout(() =>
        {
          if (this.sort) this.dataSource.sort = this.sort;
          if (this.paginator) this.dataSource.paginator = this.paginator;
        });
      },
      error: (err) =>
      {
        console.error('Error cargando CSV', err);
        this.dataSource.data = [];
      },
      complete: () => (this.loading = false)
    });
  }

  onRankingChange(type: 'historica' | 'general' | 'insular' | 'regional')
  {
    this.selectedRanking = type;
    this.loadRanking();
  }

  private getTitle(type: 'historica' | 'general' | 'insular' | 'regional'): string
  {
    switch (type)
    {
      case 'historica': return 'CLASIFICACIÓN HISTÓRICA';
      case 'general': return 'CLASIFICACIÓN GENERAL';
      case 'insular': return 'CLASIFICACIÓN LIGA INSULAR';
      case 'regional': return 'CLASIFICACIÓN LIGA REGIONAL';
      default: return '';
    }
  }
}
