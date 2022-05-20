import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { MoviesService } from "../service/movies.service";

@Component({
  selector: "app-user",
  template: `
    <div class="container">
      <h1>Info Utente</h1>
      <h3>Nome e Cognome: {{ userName }}</h3>
      <h3>Email: {{ userEmail }}</h3>
    </div>
  `,
  styles: [
    `
      .container {
        text-align: center;
      }
      h1 {
        font-size: 2rem;
      }
      h3 {
        font-size: 1.5rem;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  userName!: string;
  userEmail!: string;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.userName = data.user.name + " " + data.user.surname;
      this.userEmail = data.user.email;
    });
  }

  userLogout() {
    return this.authSrv.logout();
  }
}
