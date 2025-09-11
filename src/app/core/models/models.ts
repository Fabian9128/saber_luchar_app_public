export interface Lucha
{
  jornada: number;
  fecha: string;
  luchada: string;
  resultado?: string;
  [key: string]: string | number | undefined;
}

export interface Player
{
  jugador: string;
  puntos: number;
  exacto: number;
  dobles: number;
}

export interface Partido
{
  local: string | null;
  visitante: string | null;
  idaLocal?: string;
  vueltaLocal?: string;
  idaVisitante?: string;
  vueltaVisitante?: string;
}

export interface Luchador
{
  nombre: string;
  categoria: string;
}

export interface Equipo
{
  nombre: string;
  isla: string;
  logo: string;
  luchadores: Luchador[];
}

export interface PlantillasData
{
  equipos: Equipo[];
}