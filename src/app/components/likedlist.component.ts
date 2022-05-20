import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Liked } from "../models/liked";
import { Movie } from "../models/movie";
import { MoviesService } from "../service/movies.service";

@Component({
  selector: "app-likedlist",
  template: `
    <div class="container">
      <h1>I miei film Preferiti</h1>
      <div fxLayout="row wrap" fxLayoutGap="16px grid">
        <mat-spinner color="accent" style="margin:20% auto;" *ngIf="movies.length == 0"></mat-spinner>
        <div fxFlex="25%" fxFlex.xs="100%" fxFlex.sm="33%" *ngFor="let movie of movies; let i = index">
          <mat-card>
            <img mat-card-image src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}" alt="Copertina del film" />
            <mat-card-content>
              <h3>{{ movie.title }}</h3>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button *ngIf="likeResearch(movie)" color="warn" (click)="likedRemove(movie)">
                <mat-icon>remove_circle</mat-icon>
                Rimuovi
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
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
      mat-card {
        text-align: center;
      }
      button {
        vertical-align: middle;
      }
    `,
  ],
})
export class LikedlistComponent implements OnInit {
  movies: Movie[] = [];
  liked!: Liked[];
  sub!: Subscription;
  userId!: number;

  constructor(private authSrv: AuthService, private movieSrv: MoviesService) {}

  ngOnInit(): void {
    this.sub = this.authSrv.user$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.userId = data.user.id;
    });
    this.onLikedMovie(this.userId);
    this.movieSrv.getMovies().subscribe((data) => {
      this.movies = data.filter((data) => this.likeResearch(data));
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

  likedRemove(movie: Movie) {
    this.movies = this.movies.filter((removed) => removed.id !== movie.id);
    const like = this.liked.find((liked) => liked.movieId == movie.id);
    this.liked = this.liked.filter((liked) => liked !== like);
    if (!like) {
      return;
    }
    this.sub = this.movieSrv.removeLiked(like.id).subscribe();
  }
}
