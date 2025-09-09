import { Component } from '@angular/core';
import { Link } from '../Model/Link';
import { CommonModule } from '@angular/common';
import { Servico } from '../service/servico';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meus-links',
  imports: [CommonModule],
  templateUrl: './meus-links.html',
  styleUrl: './meus-links.css'
})
export class MeusLinks {

constructor(private service:Servico,private router:ActivatedRoute){

}

nome:string
links$!:Observable<Link[]>
msg:string
msgBool:boolean=false


ngOnInit(){

  const username=this.router.snapshot.paramMap.get('username')
  this.nome=username
  this.links$=this.service.buscaLinksUsuario(username)
   
  
}

}
