import { Component } from '@angular/core';
import { Link } from '../Model/Link';
import { CommonModule, } from '@angular/common';
import { signal } from '@angular/core';
import { Servico } from '../service/servico';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FooterNg } from "../footer-ng/footer-ng";

@Component({
  selector: 'app-meus-links',
  imports: [CommonModule, FooterNg,],
  templateUrl: './meus-links.html',
  styleUrl: './meus-links.css'
})
export class MeusLinks {

constructor(private service:Servico,private router:ActivatedRoute,private routerL:Router){

}

nome:string
links$!:Observable<Link[]>
msg:string
msgBool:boolean=false
loading=signal(false)


ngOnInit(){
  this.loading.set(true)
  const username=this.router.snapshot.paramMap.get('username')
  this.service.buscarUsuarioUser(username).subscribe({
    next:(response)=>{
          this.nome=response.nome
          this.links$=this.service.buscaLinksUsuario(username)
          setTimeout(()=>{
            this.loading.set(false)
          },2000)
    },
    error:()=>{
        this.loading.set(false)
    }
  })
  
   
  
}

toHome(){
  this.routerL.navigate(['/'])
}

}
