import { Component, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { delay, filter } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-homepage",
  template: `
    <mat-toolbar class="mat-elevation-z8">
      <img src="https://cdn.worldvectorlogo.com/logos/amazon-prime-video-logo.svg" width="180px" alt="logo amazon video" />
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav="matSidenav" class="mat-elevation-z8">
        <h1>Benvenuto/a</h1>
        <h2 class="name">{{ userName }}</h2>

        <mat-divider></mat-divider>

        <button mat-button class="menu-button" routerLink="/movies">
          <mat-icon>home</mat-icon>
          <span>Home</span>
        </button>
        <button mat-button class="menu-button" routerLink="/profile">
          <mat-icon>person_outline</mat-icon>
          <span>Profilo</span>
        </button>
        <!-- <button mat-button class="menu-button" routerLink="/profile">
          <mat-icon>favorite</mat-icon>
          <span>La mia Lista</span>
        </button> -->

        <mat-divider></mat-divider>

        <button mat-button class="menu-button" (click)="userLogout()" color="warn">
          <mat-icon>exit_to_app</mat-icon>
          <span>Esci</span>
        </button>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content mat-elevation-z8">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-toolbar {
        background: white;
        color: white;
        justify-content: center;
        height: 8%;
      }
      mat-sidenav {
        width: 300px;
        border-right: none;
        background: rgb(35, 47, 62);
        color: white;
        padding: 16px;
        text-align: center;
      }

      .content {
        height: calc(100vh - 130px);
        border-radius: 10px;
        margin: 16px;
        padding: 16px;
        overflow: auto;
      }

      mat-sidenav-container {
        height: calc(100vh - 65px);
        box-sizing: content-box;
      }

      .menu-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.3rem;

        mat-icon {
          margin-right: 8px;
        }
      }

      .name {
        margin-top: 8px;
        font-weight: bold;
        font-size: 28px;
      }

      .designation {
        margin-top: 2px;
        font-size: 0.7rem;
        color: lightgrey;
      }

      mat-divider {
        margin-top: 16px;
        margin-bottom: 16px;
        background-color: rgba(255, 255, 255, 0.5);
      }
    `,
  ],
})
export class HomepageComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  userName!: string;

  constructor(private observer: BreakpointObserver, private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.userName = data.user.name;
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(["(max-width: 800px)"])
      .pipe(delay(1))
      .subscribe((res) => {
        this.sidenav.mode = "side";
        this.sidenav.open();
      });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      if (this.sidenav.mode === "over") {
        this.sidenav.close();
      }
    });
  }

  userLogout() {
    return this.authSrv.logout();
    this.userName = "";
  }
}
