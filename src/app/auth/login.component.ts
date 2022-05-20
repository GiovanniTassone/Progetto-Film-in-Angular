import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  template: `
    <mat-toolbar class="mat-elevation-z8">
      <img src="https://cdn.worldvectorlogo.com/logos/amazon-prime-video-logo.svg" width="180px" alt="logo amazon video" />
    </mat-toolbar>
    <div class="container">
      <mat-card class="card">
        <mat-card-title class="mb">Login</mat-card-title>
        <mat-card-content>
          <form #f="ngForm" (ngSubmit)="registrationSubmit(f)">
            <mat-form-field appearance="fill" color="accent">
              <mat-label>Email</mat-label>
              <input matInput placeholder="Inserisci la tua Email" type="email" ngModel name="email" required />
            </mat-form-field>

            <mat-form-field appearance="fill" color="accent">
              <mat-label>Password</mat-label>
              <input matInput placeholder="Inserisci la tua Password" type="password" ngModel name="password" required />
            </mat-form-field>

            <mat-card-actions>
              <div class="center">
                <button mat-raised-button color="primary" [disabled]="f.invalid" type="submit">Accedi</button>
              </div>
            </mat-card-actions>
          </form>
        </mat-card-content>
        <mat-card-footer>
          <p>
            Oppure
            <span routerLink="/signup">Registrati!</span>
          </p>
        </mat-card-footer>
      </mat-card>
      <div *ngIf="errorMessage" role="alert" class="alert"><mat-icon>error</mat-icon> {{ errorMessage }}</div>
    </div>
  `,
  styles: [
    `
      .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgb(5, 164, 221);
      }
      mat-card {
        background-color: rgb(35, 47, 62);
      }
      .card {
        text-align: center;
        width: 30%;
        border-radius: 20px;
        margin-top: 10%;
        margin-bottom: 2%;
      }
      .mb {
        font-size: 1.8rem;
        margin-bottom: 20px;
      }
      mat-form-field {
        margin: 3px;
      }
      mat-card-footer p {
        font-size: 18px;
      }
      span:hover {
        color: red;
        text-decoration: underline;
      }
      mat-toolbar {
        background: white;
        color: white;
        justify-content: center;
        height: 8%;
      }
      .alert {
        background-color: rgb(248, 215, 218);
        color: red;
        width: 20%;
        padding: 1rem 1.5rem;
        border: 1px solid red;
        border-radius: 20px;
        text-align: center;
        font-size: 18px;
      }
      mat-icon {
        vertical-align: text-bottom;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async registrationSubmit(f: any) {
    try {
      await this.authSrv.login(f.value).toPromise();
      f.reset();
      this.errorMessage = undefined;
      this.router.navigate(["/movies"]);
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }
}
