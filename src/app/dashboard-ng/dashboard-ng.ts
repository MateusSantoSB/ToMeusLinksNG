import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Servico } from '../servico';
import { Link } from '../Model/Link';


@Component({
  selector: 'app-dashboard-ng',
  imports: [CommonModule],
  templateUrl: './dashboard-ng.html',
  styleUrl: './dashboard-ng.css'
})
export class DashboardNg {

constructor(private service:Servico){

}

usuarioNome:string="Mateus"
gerenciarLinks:boolean=true
adicionarLink:boolean=false
removerLink:boolean=false
links:string[]=["youtube.com/tatate","instgram.com/slamosss"]
usuario:any
ngOnInit(){

this.usuario=this.service.buscarToken()
}


linkVerif(){
if(this.links.length>0){
  return true
}
return false
}

adicionarLinks(link_user:string,titulo:string,icon:string){
  let id=this.usuario.id
  const link:Link={
      "link_user":link_user,
      "titulo":titulo,
      "icon":icon
  }

  this.service.adicionarLink(link,id).subscribe({

    next:(response)=>{
      console.log("Link"+titulo+" Adicionado")
    },
    error:()=>{
      console.log("Link NÂO adicionado!")
    }

  })
}
toAdicionar(){
  this.gerenciarLinks=false
  this.adicionarLink=true
}
toGerenciarLinks(){
  this.gerenciarLinks=true
  this.adicionarLink=false
  this.removerLink=false

}

toRemover(){
  this.gerenciarLinks=false
  this.removerLink=true
}




}


