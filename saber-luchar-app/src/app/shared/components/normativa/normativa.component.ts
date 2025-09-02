import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-normativa',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.scss'],
})
export class NormativaComponent {}
