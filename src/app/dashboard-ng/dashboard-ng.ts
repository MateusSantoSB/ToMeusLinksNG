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
this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
this.msg=""


}

addLink=new FormGroup({
link:new FormControl("",[Validators.required,Validators.maxLength(255)]),
titulo:new FormControl("",[Validators.required,Validators.maxLength(55)]),
icone:new FormControl("",[Validators.required,Validators.maxLength(255)])
})

editLink=new FormGroup({
  link:new FormControl(this.linkEdit.link_user,[Validators.required,Validators.maxLength(255)]),
titulo:new FormControl(this.linkEdit.titulo,[Validators.required,Validators.maxLength(55)]),
icone:new FormControl(this.linkEdit.icone,[Validators.required,Validators.maxLength(255)])
})

sair(){
  localStorage.removeItem('token')
  this.router.navigate([''])
}


adicionarLinks(){


  let username=this.usuario.Username
  const regex = /[\/.@#\$%\^\&*\)\(+=._-]/;
  const link:Link={
      "link_user":this.addLink.get('link').value.trim(),
      "titulo":this.addLink.get('titulo').value.trim(),
      "icone":this.addLink.get('icone').value.trim()
  }


 
  if(!regex.test(link.titulo)){
    
   this.service.adicionarLink(link,username).subscribe({
      next:()=>{
      this.msgAdicionado=true
      this.msg="Link Adicionado com sucesso !!"
      this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
      this.addLink.reset()
      this.cd.markForCheck();
    
      
    setTimeout(()=>{
        this.msgAdicionado=false
        this.cd.markForCheck();
    },3000)
      
     
    },
    error:(error)=>{
        this.msgAdicionado=true
        this.msg=error.error.erro
        this.cd.markForCheck();


      setTimeout(()=>{
        this.msgAdicionado=false
      },3000)
    }

  })

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
  
  const username=this.usuario.Username
  this.service.deletarLink(username,titulo).subscribe({
    next:()=>{
          this.msgRemovido=true
          this.msg="Link Removido!"
          this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
          this.cd.markForCheck();
     

      setTimeout(()=>{
        this.msgRemovido=false
        this.cd.markForCheck();
            },3000)
    },
    error:()=>{
          this.msgRemovido=true
          this.msg="Ocorreu um erro!!"
          this.cd.markForCheck();        

      setTimeout(()=>{
        this.msgRemovido=false
        this.cd.markForCheck();
      },3000)

    }


  })
}

editarLinks(titulo:string){
this.msg=""
this.msgEditado=false

  //TODO ? NO REGEX
  const regex = /[\/.@#\$%\^\&*\)\(+=._-]/;
  const username=this.usuario.Username
  const link:Link={
     "link_user":this.editLink.get('link').value,
      "titulo":this.editLink.get('titulo').value,
      "icone":this.editLink.get('icone').value
  }

if(!regex.test(link.titulo)){

  this.service.editarLink(username,titulo,link).subscribe({
      next:()=>{
         this.msgEditado=true;
         this.msg="Link editado"
         this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
         this.cd.detectChanges()
          setTimeout(()=>{
            this.msg=""
            this.msgEditado=false
            this.cd.detectChanges()
          },3000)

        },
        error:()=>{
            this.msgEditado=true
            this.msg="Ocorreu um erro"
            this.cd.detectChanges();
        

          setTimeout(()=>{
            this.msgEditado=false
            this.cd.detectChanges();

          },3000)
        }

  })
  }else{
      this.msgEditado=true
      this.msg="Edite o titulo sem Caracteres Especiais"
      this.cd.detectChanges();
      
    }

      
}


edit2(titulo:string){
 
  const username=this.usuario.Username

  this.service.buscarLink(username,titulo).subscribe({
    next:(response)=>{

        this.linkEdit=response
        this.editLink.patchValue({
          link:this.linkEdit.link_user,
          titulo:this.linkEdit.titulo,
          icone:this.linkEdit.icone
        })
        this.toEditar2()
        this.cd.markForCheck();

      
    },
    error:()=>{
          this.msgEditado=true
          this.msg="Ocorreu um erro"
          this.cd.markForCheck();

      
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


