import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceMovieService} from '../../../service/service-movie.service';
@Component({
  selector: 'app-movie-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  @Input("id") id!:string;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly movieService: ServiceMovieService = inject(ServiceMovieService);

  formMovie : FormGroup = this.formBuilder.group({
    _id: [],
    title: [''],
    year: [ new Date().getFullYear()],
    director: [''],
    plot: [''],
    genres: [],
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0],
    })
  })

  myNewGenres: FormGroup = this.formBuilder.group({
    newGenre:['']
  });
  editar = false;

  ngOnInit(): void {
    this.loadMovie();
  }

  get title():any {
    return this.formMovie.get('title');
  }
  get year():any {
    return this.formMovie.get('year');
  }
  get director():any {
    return this.formMovie.get('director');
  }
  get plot():any {
    return this.formMovie.get('plot');
  }
  get genres():any {
    return this.formMovie.get('genres');
  }
  get poster():any {
    return this.formMovie.get('poster');
  }
  get rating():any {
    return this.formMovie.get('imdb.rating');
  }
  get votes():any {
    return this.formMovie.get('imdb.votes');
  }

  private loadMovie() {
    if (this.id) {
      //editamos peli, rellenamos el formulario
      this.editar = true;
      this.movieService.getMovie(this.id).subscribe({
        next:(data)=>{
          this.formMovie.setValue(data.status) //
        },
        error:(err)=>{
          console.error('Error loading movie', err);
        },
        complete:()=>{
          console.log('Movie loaded successfully');
        }
      })
    }
    else {
      //creamos peli nueva, vaciamos campos
      this.formMovie.reset();
      this.editar = false;
    }
  }

  addMovie() {

  }

  addNewGenre() {
    let newGenre =  this.genres.value; // obtenemos los géneros actuales
    newGenre.push(this.myNewGenres.get('newGenre')?.value); // añadimos el nuevo género
    this.formMovie.setControl('genres', new FormControl(newGenre)); // actualizamos el control 'genres' del formulario
    this.myNewGenres.reset() // limpiamos el campo del nuevo género
  }

  getGenreSelectSize(): number {
    const genreCount = this.genres.value?.length || 0;
    return Math.min(Math.max(genreCount, 5), 10); // Mínimo 5, máximo 10
  }
}
