import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  protected model = signal({ email: '', password: '' });
  protected loginForm = form(this.model, (path) => {
    required(path.email, { message: "L'email est requis" });
    required(path.password, { message: 'Le mot de passe est requis' });
  });
  protected error = signal<string | null>(null);
  protected loading = signal(false);

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (!this.loginForm().valid()) return;

    const { email, password } = this.model();
    this.error.set(null);
    this.loading.set(true);

    this.authService.login(email, password).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.error.set('Email ou mot de passe incorrect.');
        this.loading.set(false);
      },
    });
  }
}
