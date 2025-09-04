import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard-ng',
  imports: [CommonModule],
  templateUrl: './dashboard-ng.html',
  styleUrl: './dashboard-ng.css'
})
export class DashboardNg {


usuarioNome:string="Mateus"
gerenciarLinks:boolean=true
adicionarLink:boolean=false
removerLink:boolean=false
links:string[]=["youtube.com/tatate","instgram.com/slamosss"]

ngOnInit(){
}


linkVerif(){
if(this.links.length>0){
  return true
}
return false
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


