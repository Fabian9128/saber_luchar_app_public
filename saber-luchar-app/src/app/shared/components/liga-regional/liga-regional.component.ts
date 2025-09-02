import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LigaRegionalService, Lucha } from '../../../services/liga-regional.service';

@Component({
  selector: 'app-liga-regional',
  templateUrl: './liga-regional.component.html',
  styleUrls: ['./liga-regional.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class LigaRegionalComponent implements OnInit 
{
  luchas: Lucha[] = [];
  jornadas: { numero: number, luchas: Lucha[] }[] = [];
  jugadores: string[] = [];
  equiposIconos: { [nombre: string]: string } = {
  'TEDOTE': 'assets/images/tedote.png',
  'CANDELARIA': 'assets/images/candelaria.png',
  'TAZACORTE': 'assets/images/tazacorte.png',
  'ARIDANE': 'assets/images/aridane.png',
  'BEDIESTA': 'assets/images/bediesta.png',
  'TAMANCA': 'assets/images/tamanca.png',
  'ROSARIO VALLE GUERRA': 'assets/images/rosariovg.png',
  'GUAMASA': 'assets/images/guamasa.png',
  'TEGUESTE': 'assets/images/tegueste.png',
  'VICTORIA': 'assets/images/victoria.png',
  'CHIMBESQUE': 'assets/images/chimbesque.png',
  'CAMPITOS': 'assets/images/campitos.png',
  'CASTRO MORALES': 'assets/images/castro.png',
  'ALMOGARÉN': 'assets/images/almogaren.png',
  'U. GÁLDAR': 'assets/images/galdar.png',
  'CASTILLO': 'assets/images/castillo.png',
  'MAXORATA': 'assets/images/maxorata.png',
  'U. TETIR': 'assets/images/tetir.png',
  'U. ANTIGUA': 'assets/images/antigua.png',
  'ROSARIO': 'assets/images/rosarioftv.png',
  'SALADAR': 'assets/images/saladar.png',
  'FUERTEVENTURA': 'assets/images/fuerteventura.jfif',
  };
  loading = true;

  constructor(private ligaRegionalService: LigaRegionalService) {}

  ngOnInit(): void
  {
    this.loadLuchas();
  }

  loadLuchas(): void
  {
    this.loading = true;
    this.ligaRegionalService.getLuchas().subscribe(
    {
      next: (allLuchas) =>
      {
        this.luchas = allLuchas;

        const grouped: { [key: number]: Lucha[] } = {};
        for (const m of allLuchas)
        {
          if (!grouped[m.jornada]) grouped[m.jornada] = [];
          grouped[m.jornada].push(m);
        }

        this.jornadas = Object.keys(grouped)
          .map(j => ({ numero: Number(j), luchas: grouped[Number(j)] }))
          .sort((a, b) => a.numero - b.numero);

        if (allLuchas.length > 0)
        {
          const sample = allLuchas[0];
          this.jugadores = Object.keys(sample)
            .filter(k => !['jornada','fecha','luchada','resultado','DOBLE','doble'].includes(k));
        }

        this.loading = false;
      },
      error: (err) =>
      {
        console.error('Error cargando luchas:', err);
        this.loading = false;
      }
    });
  }

  calcularPuntos(luchas: Lucha[], jugador: string): number
  {
    let total = 0;
    luchas.forEach(m =>
    {
      const pronostico = (m[jugador] as string)?.trim();
      const resultado = (m.resultado as string)?.trim();
      if (!pronostico || !resultado) return;

      let puntos = 0;

      if (resultado === '12-12' && pronostico === '12-12') puntos = 5;
      else if (resultado === pronostico) puntos = 3;
      else {
        const [resLocal, resVisitante] = resultado.split('-').map(Number);
        const [proLocal, proVisitante] = pronostico.split('-').map(Number);
        if ((resLocal > resVisitante && proLocal > proVisitante) ||
            (resLocal < resVisitante && proLocal < proVisitante)) puntos = 1;
      }

      if (String(m['DOBLE']).toUpperCase() === 'SI') puntos *= 2;

      total += puntos;
    });
    return total;
  }

  getClassLucha(lucha: Lucha, col: 'fecha' | 'luchada' | 'resultado'): string
  {
    return String(lucha['DOBLE']).toUpperCase() === 'SI' ? 'dorado' : '';
  }

  getCellPronostico(lucha: Lucha, jugador: string): string
  {
    const pronostico = (lucha[jugador] as string)?.trim();
    const resultado = (lucha.resultado as string)?.trim();
    const doble = String(lucha['DOBLE']).toUpperCase() === 'SI';

    if (!pronostico) return 'error';

    if (resultado === '12-12' && pronostico === '12-12')
    {
      return doble ? 'violeta' : 'verde';
    }
    else if (resultado === pronostico)
    {
      return doble ? 'violetaclaro' : 'verdeclaro';
    }

    const [resLocal, resVisitante] = resultado.split('-').map(Number);
    const [proLocal, proVisitante] = pronostico.split('-').map(Number);

    if ((resLocal > resVisitante && proLocal > proVisitante) ||
        (resLocal < resVisitante && proLocal < proVisitante))
    {
      return doble ? 'rosa' : 'amarillo';
    }

    return 'rojo';
  }
}
