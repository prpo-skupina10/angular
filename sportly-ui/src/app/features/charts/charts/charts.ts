import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ChartsService } from '../../../core/services/charts.service';
import { environment } from '../../../../environments/environment';

interface ChartResponse {
  chart_url: string;
}

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.html'
})
export class ChartsComponent {

  playersChart$?: Observable<string>;
  standingsChart$?: Observable<string>;

  constructor(private chartsService: ChartsService) {}

  private fullChartUrl(relativePath: string): string {
    const base = environment.apiUrl.replace('/api', '');
    return `${base}${relativePath}?t=${Date.now()}`;
  }

  loadPlayersChart(): void {
    this.standingsChart$ = undefined;

    this.playersChart$ = this.chartsService
      .playersByPosition(33)
      .pipe(
        map((res: ChartResponse) => this.fullChartUrl(res.chart_url))
      );
  }

  loadStandingsChart(): void {
    this.playersChart$ = undefined;

    this.standingsChart$ = this.chartsService
      .standings(39, 2023)
      .pipe(
        map((res: ChartResponse) => this.fullChartUrl(res.chart_url))
      );
  }
}