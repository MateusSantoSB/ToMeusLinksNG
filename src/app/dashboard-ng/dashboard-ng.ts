import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Servico } from '../servico';
import { Link } from '../Model/Link';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard-ng',
  imports: [CommonModule],
  templateUrl: './dashboard-ng.html',
  styleUrl: './dashboard-ng.css'
})
export class DashboardNg {

constructor(private service:Servico,private cd:ChangeDetectorRef){

}
msg:string=""
msgAdicionado:boolean=false
msgRemovido:boolean=false

usuarioNome:string="Mateus"
gerenciarLinks:boolean=true
adicionarLink:boolean=false
removerLink:boolean=false
links$!:Observable<Link[]>
usuario:any
ngOnInit(){

this.usuario=this.service.buscarToken()
this.links$=this.service.buscaLinksUsuario(this.usuario.Id)



}




adicionarLinks(link_user:string,titulo:string,icone:string){
 
  let id=this.usuario.Id
  const link:Link={
      "link_user":link_user,
      "titulo":titulo,
      "icone":icone
  }
  this.service.adicionarLink(link,id).subscribe({

    next:(response)=>{
      console.log("Link"+titulo+" Adicionado")
      this.msgAdicionado=true
      this.msg="Link Adicionado com sucesso !!"
      this.links$=this.service.buscaLinksUsuario(this.usuario.Id)
      this.cd.detectChanges()
      setTimeout(()=>{
        this.msgAdicionado=false
        this.cd.detectChanges()
      },3000)
      
     
    },
    error:()=>{
        this.msgAdicionado=true
        this.msg="Ocorreu um erro!!"
      setInterval(()=>{
        this.msgAdicionado=false
      },3000)
    }

  })

}

removerLinks(titulo:string){
  const id=this.usuario.Id
  this.service.deletarLink(id,titulo).subscribe({
    next:()=>{
      this.msgRemovido=true
      this.msg="Link Removido!"
      this.links$=this.service.buscaLinksUsuario(this.usuario.Id)
      this.cd.detectChanges()

      setInterval(()=>{
        this.msgRemovido=false
        this.cd.detectChanges()
      },3000)
    },
    error:()=>{
       this.msgRemovido=true
        this.msg="Ocorreu um erro!!"
      setInterval(()=>{
        this.msgRemovido=false
      },3000)

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


