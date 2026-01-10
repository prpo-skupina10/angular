import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, Observable, switchMap, tap, catchError, of, startWith } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {

  form!: FormGroup;

  private submit$ = new Subject<void>();
  result$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.result$ = this.submit$.pipe(
      switchMap(() =>
        this.authService.login(
          this.form.value.username,
          this.form.value.password
        ).pipe(
          tap(() => this.router.navigate(['/home'])),
          catchError(err =>
            of(err?.error?.message || 'Invalid credentials')
          )
        )
      ),
      startWith('')
    );
  }

  submit() {
    if (this.form.invalid) return;
    this.submit$.next();
  }
}