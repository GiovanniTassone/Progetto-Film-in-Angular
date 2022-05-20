import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../service/movies.service";
import { Movie } from "../models/movie";
import { Liked } from "../models/liked";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-movies",
  template: `
    <div class="container">
      <div fxLayout="row wrap" fxLayoutGap="16px grid">
        <mat-spinner color="accent" style="margin:20% auto;" *ngIf="movies.length == 0"></mat-spinner>
        <div fxFlex="25%" fxFlex.xs="100%" fxFlex.sm="33%" *ngFor="let movie of movies; let i = index">
          <mat-card>
            <img mat-card-image src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}" alt="Copertina del film" />
            <mat-card-content>
              <h3>Valutato con {{ movie.vote_average }} <mat-icon>grade</mat-icon> da {{ movie.vote_count }} Recensioni</h3>
            </mat-card-content>
            <mat-card-actions>
              <button mat-mini-fab *ngIf="!likeResearch(movie)" (click)="likedPost(movie)">
                <mat-icon>favorite</mat-icon>
              </button>
              <button mat-mini-fab *ngIf="likeResearch(movie)" color="warn" (click)="likedRemove(movie)">
                <mat-icon>favorite</mat-icon>
              </button>
              <button mat-raised-button color="accent" [routerLink]="['/movies', movie.id]">Dettagli</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-icon {
        vertical-align: sub;
        color: yellow;
      }
      button mat-icon {
        color: white;
      }
    `,
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  liked!: Liked[];
  sub!: Subscription;
  userId!: number;

  likesMovies: Liked[] = [];

  constructor(private movieSrv: MoviesService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authSrv.user$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.userId = data.user.id;
    });
    this.onLikedMovie(this.userId);
    this.movieSrv.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  onLikedMovie(userId: number) {
    this.sub = this.movieSrv.getLikedMovie(userId).subscribe((data) => {
      this.liked = data;
      console.log(this.liked);
    });
  }

  likeResearch(movie: Movie) {
    return this.liked.find((element) => element.movieId == movie.id);
  }

  likedPost(movie: Movie) {
    this.sub = this.movieSrv.likedPost(movie.id, this.userId).subscribe((data) => {
      this.liked.push(data);
    });
  }

  likedRemove(movie: Movie) {
    const like = this.liked.find((liked) => liked.movieId == movie.id);
    this.liked = this.liked.filter((liked) => liked !== like);
    if (!like) {
      return;
    }
    this.sub = this.movieSrv.removeLiked(like.id).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
