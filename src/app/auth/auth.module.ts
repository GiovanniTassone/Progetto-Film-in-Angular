import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
import { LoginGuard } from "./login.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, FormsModule, MatCardModule, RouterModule.forChild(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
