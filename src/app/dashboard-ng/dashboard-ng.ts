import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Servico } from '../service/servico';
import { Link } from '../Model/Link';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-ng',
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-ng.html',
  styleUrl: './dashboard-ng.css'
})
export class DashboardNg {

constructor(private service:Servico,private cd:ChangeDetectorRef,private router:Router){

}
msg:string=""
msgAdicionado:boolean=false
msgRemovido:boolean=false
msgEditado:boolean=false

linkEdit:Link=new Link 
usuarioNome:string="Mateus"

gerenciarLinks:boolean=true
adicionarLink:boolean=false
removerLink:boolean=false
editarLink:boolean=false
editarLink2:boolean=false

links$!:Observable<Link[]>
usuario:any
ngOnInit(){

this.usuario=this.service.buscarToken()
this.links$=this.service.buscaLinksUsuario(this.usuario.Id)



}

addLink=new FormGroup({
link:new FormControl("",[Validators.required,Validators.maxLength(255)]),
titulo:new FormControl("",[Validators.required,Validators.maxLength(55)]),
icone:new FormControl("",[Validators.required,Validators.maxLength(255)])
})

editLink=new FormGroup({
  link:new FormControl("sssss",[Validators.required,Validators.maxLength(255)]),
titulo:new FormControl(this.linkEdit.titulo,[Validators.required,Validators.maxLength(55)]),
icone:new FormControl(this.linkEdit.icone,[Validators.required,Validators.maxLength(255)])
})

sair(){
  localStorage.removeItem('token')
  this.router.navigate([''])
}


adicionarLinks(){


  let id=this.usuario.Id
  const regex = /[\/.@#\$%\^\&*\)\(+=._-]/;
  const link:Link={
      "link_user":this.addLink.get('link').value.trim(),
      "titulo":this.addLink.get('titulo').value.trim(),
      "icone":this.addLink.get('icone').value.trim()
  }

  let linkLenght:number
  this.links$.subscribe(list=>{linkLenght=list.length})



  if(!regex.test(link.titulo)){
    if(linkLenght<=4){
   this.service.adicionarLink(link,id).subscribe({
      next:()=>{
      console.log("Link Adicionado")
      this.msgAdicionado=true
      this.msg="Link Adicionado com sucesso !!"
      this.links$=this.service.buscaLinksUsuario(this.usuario.Id)
      this.addLink.reset()
      this.cd.detectChanges()
      setTimeout(()=>{
        this.msgAdicionado=false
        this.cd.detectChanges()
      },3000)
      
     
    },
    error:(error)=>{
        this.msgAdicionado=true
        this.msg="Ocorreu um erro"
        this.cd.detectChanges()
      setTimeout(()=>{
        this.msgAdicionado=false
      },3000)
    }

  })
}else{
    this.msgAdicionado=true
  this.msg="Limite de Links é 5"

  setTimeout(()=>{
    this.msgAdicionado=false
    this.msg=""
  },2000)
}
}else{
  this.msgAdicionado=true
  this.msg="Crie o titulo sem Caracteres Especiais"

  setTimeout(()=>{
    this.msgAdicionado=false
    this.msg="Crie o titulo sem Caracteres Especiais"

  },2000)

}

}

removerLinks(titulo:string){
  this.msg=""
  
  const id=this.usuario.Id
  this.service.deletarLink(id,titulo).subscribe({
    next:()=>{
      this.msgRemovido=true
      this.msg="Link Removido!"
      this.links$=this.service.buscaLinksUsuario(this.usuario.Id)
      this.cd.detectChanges()

      setTimeout(()=>{
        this.msgRemovido=false
        this.cd.detectChanges()
      },3000)
    },
    error:()=>{
       this.msgRemovido=true
        this.msg="Ocorreu um erro!!"
                this.cd.detectChanges()

      setTimeout(()=>{
        this.msgRemovido=false
        this.cd.detectChanges()

      },3000)

    }


  })
}

editarLinks(titulo:string){
  const regex = /[\/.@#\$%\^\&*\)\(+=._-]/;
  const id=this.usuario.Id
  const link:Link={
     "link_user":this.editLink.get('link').value,
      "titulo":this.editLink.get('titulo').value,
      "icone":this.editLink.get('icone').value
  }

if(!regex.test(link.titulo)){

  this.service.editarLink(id,titulo,link).subscribe({
        next:()=>{
            this.msgEditado=true;
            this.msg="Link editado"
            this.cd.detectChanges()

             this.links$=this.service.buscaLinksUsuario(this.usuario.Id)

            setTimeout(()=>{
            this.msgEditado=false
          },3000)

        },
        error:()=>{
          this.msgEditado=true
          this.msg="Ocorreu um erro"
          this.cd.detectChanges()

          setTimeout(()=>{
            this.msgEditado=false
            this.cd.detectChanges()

          },3000)
        }

  })
  }else{
      this.msgAdicionado=true
      this.msg="Edite o titulo sem Caracteres Especiais"
  }
}


edit2(titulo:string){
 
  const id=this.usuario.Id

  this.service.buscarLink(id,titulo).subscribe({
    next:(response)=>{

      this.linkEdit=response

        this.editLink.patchValue({
          link:this.linkEdit.link_user,
          titulo:this.linkEdit.titulo,
          icone:this.linkEdit.icone
        })
        this.toEditar2()
        this.cd.detectChanges()

      
    },
    error:()=>{
         this.msgEditado=true
          this.msg="Ocorreu um erro"
          setTimeout(()=>{
            this.msgEditado=false
            this.cd.detectChanges()
          },3000)
    }

  })


}




toAdicionar(){
  this.gerenciarLinks=false
  this.adicionarLink=true
  this.msg=""
}
toGerenciarLinks(){
  this.gerenciarLinks=true
  this.adicionarLink=false
  this.removerLink=false
  this.editarLink=false
  this.editarLink2=false

}

toRemover(){
  this.gerenciarLinks=false
  this.removerLink=true
  this.msg=""
}
toEditar(){
  this.gerenciarLinks=false
  this.editarLink=true
  this.msg=""
}
toEditar2(){
  this.gerenciarLinks=false
  this.editarLink2=true
  this.editarLink=false
}




}


