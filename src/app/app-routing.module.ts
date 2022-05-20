import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./components/details.component";
import { HomepageComponent } from "./components/homepage.component";
import { MoviesComponent } from "./components/movies.component";
import { UserComponent } from "./components/user.component";
import { AuthGuard } from "./auth/auth.guard";
import { LikedlistComponent } from "./components/likedlist.component";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "profile",
        component: UserComponent,
      },
      {
        path: "movies",
        component: MoviesComponent,
      },
      {
        path: "movies/:id",
        component: DetailsComponent,
      },
      {
        path: "likedList",
        component: LikedlistComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
