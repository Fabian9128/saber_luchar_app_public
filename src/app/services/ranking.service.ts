import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

export interface Player
{
  jugador: string;
  puntos: number;
  exacto: number;
  dobles: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService
{
  constructor(private http: HttpClient) {}

  getPlayers(type: 'historica' | 'general' | 'insular' | 'regional'): Observable<Player[]>
  {
    const url = this.getUrl(type);
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(() => this.http.get(`assets/${type}.csv`, { responseType: 'text' })),
      map(csv => this.csvToPlayers(csv))
    );
  }

  private getUrl(type: 'historica' | 'general' | 'insular' | 'regional'): string
  {
    switch (type)
    {
      case 'historica':
        return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxRgLMgXXCtURQLPP3KbhwdAlT2-64i0gFxm3VEFACOGcToyKGXcl9sCWHBCDrcnhKoH9PV7H5ZnF/pub?gid=32255741&single=true&output=csv';
      case 'general':
        return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxRgLMgXXCtURQLPP3KbhwdAlT2-64i0gFxm3VEFACOGcToyKGXcl9sCWHBCDrcnhKoH9PV7H5ZnF/pub?gid=0&single=true&output=csv';
      case 'insular':
        return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxRgLMgXXCtURQLPP3KbhwdAlT2-64i0gFxm3VEFACOGcToyKGXcl9sCWHBCDrcnhKoH9PV7H5ZnF/pub?gid=160720217&single=true&output=csv';
      case 'regional':
        return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLxRgLMgXXCtURQLPP3KbhwdAlT2-64i0gFxm3VEFACOGcToyKGXcl9sCWHBCDrcnhKoH9PV7H5ZnF/pub?gid=213807830&single=true&output=csv';
      default:
        return '';
    }
  }

  private csvToPlayers(csv: string): Player[]
  {
    const lines = csv.trim().split('\n');
    if (!lines.length) return [];

    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const idxJugador = header.indexOf('jugador');
    const idxPuntos = header.indexOf('puntos');
    const idxExacto = header.indexOf('exacto');
    const idxDobles = header.indexOf('dobles');

    const players: Player[] = [];
    for (let i = 1; i < lines.length; i++)
    {
      const cols = lines[i].split(',');
      if (!cols.length) continue;

      players.push(
      {
        jugador: cols[idxJugador] || '',
        puntos: Number(cols[idxPuntos]) || 0,
        exacto: Number(cols[idxExacto]) || 0,
        dobles: Number(cols[idxDobles]) || 0,
      });
    }
    return players;
  }
}
