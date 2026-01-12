import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsService } from '../../../core/services/charts.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.html'
})
export class ChartsComponent {

  loading = false;
  error: string | null = null;

  playersChartUrl?: string;
  standingsChartUrl?: string;

  constructor(private chartsService: ChartsService) {}

  private fullChartUrl(relativePath: string): string {
    const base = environment.apiUrl.replace('/api', '');
    return `${base}${relativePath}`;
  }

  loadPlayersChart(): void {
    this.loading = true;
    this.error = null;

    this.chartsService.playersByPosition(33).subscribe({
      next: res => {
        this.playersChartUrl = this.fullChartUrl(res.chart_url);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load players chart';
        this.loading = false;
      }
    });
  }

  loadStandingsChart(): void {
    this.loading = true;
    this.error = null;

    this.chartsService.standings(39, 2023).subscribe({
      next: res => {
        this.standingsChartUrl = this.fullChartUrl(res.chart_url);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load standings chart';
        this.loading = false;
      }
    });
  }
}