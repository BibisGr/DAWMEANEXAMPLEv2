import {Component, inject, Input, OnInit} from '@angular/core';
import {ServiceMovieService} from '../../../service/service-movie.service';
import {Movie} from '../../../common/interface-movie';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: ServiceMovieService = inject(ServiceMovieService);
  movies: Movie[] = [];
  constructor() {
    this.loadMovies();
  }
  private loadMovies() {
    this.movieService.getMovies().subscribe(
      {
        next: data =>{
          this.movies = data.status;
        },
        error: err =>{
          console.error('Error carga de movies:', err);
        },
        complete:() =>{
          console.log('Movie List cargada correctamente');
        }
      }
    )
  }
}
