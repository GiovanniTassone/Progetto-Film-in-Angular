import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../models/movie";
import { MoviesService } from "../service/movies.service";

@Component({
  selector: "app-details",
  template: `
    <mat-card class="example-card">
      <mat-spinner color="accent" style="margin:0 auto;" *ngIf="!chooseMovie"></mat-spinner>
      <div *ngIf="chooseMovie">
        <mat-card-title-group>
          <mat-card-title>{{ chooseMovie.title }}</mat-card-title>
          <mat-card-subtitle>Data di uscita: {{ chooseMovie.release_date | date }}</mat-card-subtitle>
          <mat-card-subtitle>{{ chooseMovie.overview }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <img mat-card-image-md src="https://image.tmdb.org/t/p/w500{{ chooseMovie.backdrop_path }}" alt="Copertina del film" />
          <p>Spettatori: {{ chooseMovie.popularity }}</p>
          <p>Valutato con {{ chooseMovie.vote_average }} <mat-icon>grade</mat-icon> da {{ chooseMovie.vote_count }} Utenti</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button routerLink="/movies" color="warn"><mat-icon>arrow_back</mat-icon> Torna ai Film</button>
        </mat-card-actions>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        text-align: center;
        width: 800px;
        margin: 0 auto;
        background: rgb(35, 47, 62);
        border-radius: 20px;
      }
      mat-card-title {
        font-size: 2rem;
        margin-bottom: 20px;
      }
      mat-card-subtitle {
        font-size: 1.1rem;
      }
      mat-card-title-group {
        display: flex;
        justify-content: center;
      }
      img {
        width: 80%;
      }
      mat-card-content {
        font-size: 1.2rem;
        margin-top: 30px;
      }
      mat-card-content mat-icon {
        vertical-align: sub;
        color: yellow;
      }
      button {
        background: #000;
      }
    `,
  ],
})
export class DetailsComponent implements OnInit {
  chooseMovieId!: number;
  chooseMovie!: Movie;
  constructor(private movieSrv: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.chooseMovieId = this.route.snapshot.params["id"];
    this.movieSrv.getDetails(this.chooseMovieId).subscribe((ris) => {
      this.chooseMovie = ris;
    });
  }
}
