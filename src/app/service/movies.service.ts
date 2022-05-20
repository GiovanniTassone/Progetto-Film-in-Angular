import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../models/movie";
import { AuthData, AuthService } from "../auth/auth.service";
import { Liked } from "../models/liked";
import { catchError, map, take, throwError } from "rxjs";

export interface likedMovies {}

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  URL = "http://localhost:4201/movies-popular";
  URL_liked = "http://localhost:4201/favorites";

  getMovies() {
    return this.http.get<Movie[]>(`${this.URL}`);
  }

  getDetails(id: number) {
    return this.http.get<Movie>(`${this.URL}/${id}`);
  }

  getLikedMovie(userId: number) {
    return this.http.get<Liked[]>(`${this.URL_liked}`).pipe(map((liked) => liked.filter((like) => like.userId == userId)));
  }

  likedPost(movieId: number, userId: number) {
    const item = {
      userId: userId,
      movieId: movieId,
    };
    return this.http.post<Liked>(`${this.URL_liked}`, item);
  }

  removeLiked(id: number) {
    return this.http.delete(`${this.URL_liked}/${id}`);
  }
}
