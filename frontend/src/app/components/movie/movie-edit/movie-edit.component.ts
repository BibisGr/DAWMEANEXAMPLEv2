import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceMovieService} from '../../../service/service-movie.service';
import {Router} from '@angular/router';

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
  editar = false;
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly movieService: ServiceMovieService = inject(ServiceMovieService);
  private readonly router : Router = inject(Router);

  formMovie : FormGroup = this.formBuilder.group({
    _id: [],
    title: [''],
    year: [ new Date().getFullYear()],
    director: [''],
    plot: [''],
    genres: [], //null => []
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0],
    })
  })

  myNewGenres: FormGroup = this.formBuilder.group({
    newGenre:['']
  });


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
    if (this.editar){
      //editar pelicula
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Movie updated successfully', data);
            //  console.log(this.formMovie.getRawValue());
             this.router.navigate(['/movies/list'])
            //redirige a la lista de peliculas (componente MovieList) luego de actualizar
          },
          error:(err)=>{
            console.error('Error updating movie', err);
          },
          complete:()=> {
            console.log('Update movie request completed');
          }
        }
      )
    } else {
      //añadir pelicula
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Movie added successfully', data);
            this.router.navigate(['/movies/list'])
            //redirige a la lista de peliculas (componente MovieList) luego de actualizar
          },
          error:(err)=>{
            console.error('Error updating movie', err);
          },
          complete:()=> {
            console.log('Update movie request completed');
          }
        }
      )
    }
  }

  addNewGenre() {
    let newGenre =  this.genres.value; // obtenemos los géneros actuales
    if (!newGenre){
      newGenre = []
    }

    newGenre.push(this.myNewGenres.get('newGenre')?.value); // añadimos el nuevo género
    this.formMovie.setControl('genres', new FormControl(newGenre)); // actualizamos el control 'genres' del formulario
    this.myNewGenres.reset() // limpiamos el campo del nuevo género
  }
}
