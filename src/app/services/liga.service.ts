import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Lucha
{
  jornada: number;
  fecha: string;
  luchada: string;
  resultado?: string;
  [key: string]: string | number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LigaService
{
  constructor(private http: HttpClient) {}

  getLuchas(_url: string, fallbackCsv?: string, jornada?: number): Observable<Lucha[]>
  {
    if (!fallbackCsv)
    {
      console.warn('No fallback CSV provided. Returning empty array.');
      return new Observable<Lucha[]>(subscriber =>
      {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    return this.http.get(fallbackCsv, { responseType: 'text' }).pipe(
      map(csv => this.csvToLuchas(csv, jornada))
    );
  }

  private csvToLuchas(csv: string, jornada?: number): Lucha[]
  {
    const lines = csv.trim().split('\n');
    if (!lines.length) return [];

    const header = lines[0].split(',').map(h => h.trim());
    const idxJornada = header.indexOf('JORNADA');
    const idxFecha = header.indexOf('FECHA');
    const idxDoble = header.indexOf('DOBLE');
    const idxLuchada = header.indexOf('LUCHADA');
    const idxResultado = header.indexOf('RESULTADO');

    const luchas: Lucha[] = [];

    for (let i = 1; i < lines.length; i++)
    {
      const cols = lines[i].split(',');
      if (!cols.length) continue;

      const matchJornada = Number(cols[idxJornada]);
      if (jornada && matchJornada !== jornada) continue;

      const match: Lucha =
      {
        jornada: matchJornada,
        fecha: cols[idxFecha] || '',
        luchada: cols[idxLuchada] || '',
        doble: cols[idxDoble] || 'NO',
        resultado: cols[idxResultado] || ''
      };

      header.forEach((colName, idx) =>
      {
        if (!['JORNADA','FECHA','LUCHADA','RESULTADO'].includes(colName))
        {
          match[colName] = cols[idx] || '';
        }
      });

      luchas.push(match);
    }

    return luchas;
  }
}
