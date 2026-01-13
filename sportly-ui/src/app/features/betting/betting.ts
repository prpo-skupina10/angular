import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BettingService, BetRequest, BetResponse, BetSelection, FixtureOdds } from '../../core/services/betting.service';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './betting.html',
  styleUrls: ['./betting.scss']
})
export class BettingComponent {
  fixtures: FixtureOdds[] = [];
  bets: BetResponse[] = [];

  selectedFixtureId?: number;
  selection: BetSelection = 'HOME';
  stake = 10;
  message = '';
  messageVariant: 'info' | 'success' | 'danger' = 'info';
  loading = false;
  importing = false;

  constructor(private betting: BettingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadFixtures();
    this.loadBets();
  }

  loadFixtures(clearMessage = false): void {
    this.betting.getFixturesWithOdds().subscribe({
      next: data => {
        this.fixtures = data;
        if (!this.selectedFixtureId && data.length > 0) {
          this.selectedFixtureId = data[0].fixtureId;
        }
        // manual change detection - angular 21 nima vec zone.js
        this.cdr.detectChanges();
        if (clearMessage) {
          this.clearMessage();
        }
      },
      error: () => {
        this.setMessage('Failed to load fixtures', 'danger');
      }
    });
  }

  loadBets(): void {
    this.betting.listBets().subscribe({
      next: data => {
        this.bets = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.setMessage('Failed to load your bets', 'danger');
      }
    });
  }

  placeBet(): void {
    if (!this.selectedFixtureId) {
      this.setMessage('Pick a fixture first', 'danger');
      return;
    }
    this.loading = true;
    const request: BetRequest = {
      fixtureId: this.selectedFixtureId,
      selection: this.selection,
      stake: this.stake
    };

    this.betting.placeBet(request).subscribe({
      next: bet => {
        this.setMessage(`Bet placed with odds ${bet.odds.toFixed(2)}`, 'success');
        this.bets = [bet, ...this.bets];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.setMessage(err?.error?.message || 'Failed to place bet', 'danger');
        this.loading = false;
      }
    });
  }

  importFixtures(): void {
    this.importing = true;
    this.setMessage('Starting fixture import...', 'info');
    this.betting.triggerFixturesImport().subscribe({
      next: () => {
        this.setMessage('Import started. Refreshing fixtures...', 'success');
        this.loadFixtures(true);
        this.importing = false;
      },
      error: err => {
        this.setMessage(err?.error?.message || 'Failed to start import', 'danger');
        this.importing = false;
        this.cdr.detectChanges();
      }
    });
  }

  private setMessage(message: string, variant: 'info' | 'success' | 'danger' = 'info'): void {
    this.message = message;
    this.messageVariant = variant;
    this.cdr.detectChanges();
  }

  private clearMessage(): void {
    this.message = '';
    this.cdr.detectChanges();
  }
}
