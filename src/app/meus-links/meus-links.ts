import { Component } from '@angular/core';
import { Link } from '../Model/Link';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meus-links',
  imports: [CommonModule],
  templateUrl: './meus-links.html',
  styleUrl: './meus-links.css'
})
export class MeusLinks {

nome:string="Mateus Santos"
links:string[]=["Youtube"]


}
