import { Component } from '@angular/core';
import { Link } from '../Model/Link';
import { CommonModule } from '@angular/common';
import { Servico } from '../service/servico';

@Component({
  selector: 'app-meus-links',
  imports: [CommonModule],
  templateUrl: './meus-links.html',
  styleUrl: './meus-links.css'
})
export class MeusLinks {

constructor(private service:Servico){

}

nome:string
links:Link[]


ngOnInit(){

  
  





}

}
