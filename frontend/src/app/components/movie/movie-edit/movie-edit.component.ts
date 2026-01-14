import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-edit',
  imports: [],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  @Input("id") id!:string;

  ngOnInit(): void {
    this.loadMovie();
  }
  private loadMovie() {
    if (this.id){
      // editamos la pelicula
    }
    else {
      // nueva pelicula
    }
  }
}
