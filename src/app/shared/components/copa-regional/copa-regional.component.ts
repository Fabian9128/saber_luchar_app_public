import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Partido
{
  local: string | null;
  visitante: string | null;
  idaLocal?: string;
  vueltaLocal?: string;
  idaVisitante?: string;
  vueltaVisitante?: string;
}

@Component({
  selector: 'app-copa-regional',
  templateUrl: './copa-regional.component.html',
  styleUrls: ['./copa-regional.component.scss'],
  standalone: true,
  imports: [CommonModule , FormsModule]
})
export class CopaRegionalComponent implements OnInit
{
  cuartos: Partido[] = [];
  semifinales: Partido[] = [];
  final: Partido[] = [];
  tercerPuesto: Partido[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.http.get<any>('assets/copa-regional.json')
      .subscribe(data =>
      {
        this.cuartos = data.cuartos;
        this.semifinales = data.semifinales;
        this.final = data.final;
        this.tercerPuesto = data.tercerPuesto;
      });
  }

  getTotal(ida: string | undefined, vuelta: string | undefined): number
  {
    return Number(ida || 0) + Number(vuelta || 0);
  }

  getTotalClass(match: any, local: boolean): string
  {
    const totalLocal = this.getTotal(match.idaLocal, match.vueltaLocal);
    const totalVisitante = this.getTotal(match.idaVisitante, match.vueltaVisitante);

    if (totalLocal === totalVisitante) return '';
    if (local && totalLocal > totalVisitante) return 'dorado';
    if (!local && totalVisitante > totalLocal) return 'dorado';
    return '';
  }
}
