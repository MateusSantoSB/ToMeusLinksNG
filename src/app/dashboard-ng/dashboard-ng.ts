import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Servico } from '../service/servico';
import { Link } from '../Model/Link';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-ng',
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './dashboard-ng.html',
  styleUrl: './dashboard-ng.css'
})
export class DashboardNg {

constructor(private service:Servico,private cd:ChangeDetectorRef,private router:Router){

}
msg=signal("")


msgAdicionado=signal(false)
msgRemovido=signal(false)
msgEditado=signal(false)
icone:string

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


}

addLink=new FormGroup({
link:new FormControl("",[Validators.required,Validators.maxLength(255),Validators.minLength(10)]),
titulo:new FormControl("",[Validators.required,Validators.maxLength(21),Validators.minLength(3)]),
icone:new FormControl("",[Validators.required])
})



editLink=new FormGroup({
  link:new FormControl(this.linkEdit.link_user,[Validators.required,Validators.maxLength(255),Validators.minLength(10)]),
  titulo:new FormControl(this.linkEdit.titulo,[Validators.required,Validators.maxLength(21),Validators.minLength(3)]),
  icone:new FormControl(this.linkEdit.icone,[Validators.required])
})

sair(){
  localStorage.removeItem('token')
  this.router.navigate([''])
}


adicionarLinks(){
this.verficarTituloForm()
this.verficarLinkForm()
this.verficarIconeForm()

  if(this.addLink.valid){
   
    const value=this.addLink.get("icone").value
    this.verficarIcone(value)

  let username=this.usuario.Username

  const link:Link={
      "link_user":this.addLink.get('link').value.trim(),
      "titulo":this.addLink.get('titulo').value.trim(),
      "icone":this.icone
  }

   this.service.adicionarLink(link,username).subscribe({
      next:()=>{
      this.msgAdicionado.set(true)
      this.msg.set("Link Adicionado com sucesso !!")
      this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
      this.addLink.reset()
    
    setTimeout(()=>{
        this.msgAdicionado.set(false)
        this.msg.set("")
    },3000)
    
  },
    error:(error)=>{
        this.msgAdicionado.set(true)
        this.msg.set(error.error.erro)


      setTimeout(()=>{
        this.msgAdicionado.set(false)
        this.msg.set("")
      },3000)
    }

  })


}
}
//TRATAMENTO DE ERROS FORM => "ADDLINK"
verficarLinkForm(){
  if(this.addLink.get('link').errors?.['required']){
      this.msg.set("Link é Obrigatorio!")
  }
  if(this.addLink.get('link').errors?.['maxlength']){
      this.msg.set("Link invalido!")
  }
  if(this.addLink.get('link').errors?.['minlength']){
      this.msg.set("Link invalido!")
  }
}
verficarTituloForm(){
const regex=/^[a-zA-Z0-9 ]+$/;
  if(this.addLink.get('titulo').errors?.['required']){
      this.msg.set("Titulo é Obrigatorio!")
  }
  if(this.addLink.get('titulo').errors?.['maxlength']){
      this.msg.set("Titulo Muito Grande!")
  }
  if(this.addLink.get('titulo').errors?.['minlength']){
      this.msg.set("Titulo muito pequeno!")
  }
  if(!regex.test(this.addLink.get("titulo").value)){
      this.msg.set("Titulo invalido!")
      this.addLink.get("titulo").setErrors({caracteres:true})
  }
}
verficarIconeForm(){
  if(this.addLink.get('icone').errors?.['required']){
      this.msg.set("Icone é Obrigatorio!")
  }

}
//======================//




removerLinks(titulo:string){
  
  const username=this.usuario.Username
  this.service.deletarLink(username,titulo).subscribe({
    next:()=>{
          this.msgRemovido.set(true)
          this.msg.set("Link Removido!")
          this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
     

      setTimeout(()=>{
        this.msgRemovido.set(false)
        this.msg.set("")
            },3000)
    },
    error:()=>{
          this.msgRemovido.set(true)
          this.msg.set("Ocorreu um erro!!")

      setTimeout(()=>{
        this.msgRemovido.set(false)
        this.msg.set("")
      },3000)

    }


  })
}



editarLinks(titulo:string){
this.verficarIconeFormEdit()
this.verficarLinkFormEdit()
this.verficarTituloFormEdit()

if(this.editLink.valid){

    const value=this.editLink.get("icone").value
    this.verficarIcone(value)

  const username=this.usuario.Username
  const link:Link={
     "link_user":this.editLink.get('link').value,
      "titulo":this.editLink.get('titulo').value,
      "icone":this.icone
  }
  this.service.editarLink(username,titulo,link).subscribe({
      next:()=>{
         this.msgEditado.set(true);
         this.msg.set("Link editado")
         this.links$=this.service.buscaLinksUsuario(this.usuario.Username)
          
         setTimeout(()=>{
            this.msg.set("")
            this.msgEditado.set(false)
          },3000)

        },
        error:(error)=>{
            this.msgEditado.set(true)
            this.msg.set(error.error.erro)
        

          setTimeout(()=>{
            this.msgEditado.set(false)
            this.msg.set("")

          },3000)
        }

  })
  }
      
}

//TRATAMENTO DE ERROS FORM => "editLink"
verficarLinkFormEdit(){
  if(this.editLink.get('link').errors?.['required']){
      this.msg.set("Link é Obrigatorio!")
  }
  if(this.editLink.get('link').errors?.['maxlength']){
      this.msg.set("Link invalido!")
  }
  if(this.editLink.get('link').errors?.['minlength']){
      this.msg.set("Link invalido!")
  }
}
verficarTituloFormEdit(){
const regex=/^[a-zA-Z0-9 ]+$/;
  if(this.editLink.get('titulo').errors?.['required']){
      this.msg.set("Titulo é Obrigatorio!")
  }
  if(this.editLink.get('titulo').errors?.['maxlength']){
      this.msg.set("Titulo Muito Grande!")
  }
  if(this.editLink.get('titulo').errors?.['minlength']){
      this.msg.set("Titulo muito pequeno!")
  }
  if(!regex.test(this.editLink.get("titulo").value)){
      this.msg.set("Titulo invalido!")
      this.editLink.get("titulo").setErrors({caracteres:true})
  }
}
verficarIconeFormEdit(){
  if(this.editLink.get('icone').errors?.['required']){
      this.msg.set("Icone é Obrigatorio!")
  }

}
//======================//





edit2(titulo:string){
 
  const username=this.usuario.Username

  this.service.buscarLink(username,titulo).subscribe({
    next:(response)=>{

        this.linkEdit=response
        this.verficarIcone2(this.linkEdit.icone)
        this.editLink.patchValue({
          link:this.linkEdit.link_user,
          titulo:this.linkEdit.titulo,
          icone:this.icone
        })
        this.toEditar2()
        this.cd.markForCheck();

      
    },
    error:()=>{
          this.msgEditado.set(true)
          this.msg.set("Ocorreu um erro")

      
          setTimeout(()=>{
            this.msgEditado.set(false)
            this.cd.detectChanges()
          },3000)
    }

  })


}


verficarIcone2(value:string){
switch(value){
  case "/icons/instagram.png":
      this.icone="1"
  break;

  case "/icons/linkedin.png":
      this.icone="2"
  break;

   case "/icons/facebook.png":
      this.icone="3"
  break;

   case "/icons/whatsapp.png":
      this.icone="4"
  break;

   case "/icons/tiktok.png":
      this.icone="5"
  break;

   case "/icons/youtube.png":
      this.icone="6"
  break; 
}
}


verficarIcone(value:string){
switch(value){
  case "1":
  this.icone="/icons/instagram.png"
  break;
  case "2":
  this.icone="/icons/linkedin.png"
  break;
   case "3":
  this.icone="/icons/facebook.png"
  break;
   case "4":
  this.icone="/icons/whatsapp.png"
  break;
   case "5":
  this.icone="/icons/tiktok.png"
  break;
   case "6":
  this.icone="/icons/youtube.png"
  break; 
}
}


toAdicionar(){
  this.gerenciarLinks=false
  this.adicionarLink=true
  this.msg.set("")
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
  this.msg.set("")
}
toEditar(){
  this.gerenciarLinks=false
  this.editarLink=true
  this.msg.set("")
}
toEditar2(){
  this.gerenciarLinks=false
  this.editarLink2=true
  this.editarLink=false
}

toPagina(){
  const url=this.router.serializeUrl(
         this.router.createUrlTree(['/meuslinks/'+this.usuario.Username])
      )
        window.open(url,'_blank')
}




}


