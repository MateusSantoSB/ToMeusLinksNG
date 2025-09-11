import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../Model/Login';
import { Servico } from '../service/servico';
import { Router } from '@angular/router';
import { Usuario } from '../Model/Usuario';

@Component({
  selector: 'app-home-ng',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home-ng.html',
  styleUrl: './home-ng.css'
})
export class HomeNg {

constructor(private service:Servico,private router:Router){

}

inicioVisivel=true
loginVisivel=false
registrarVisivel=false

msg=signal("")
msgColor=signal("")




email:string="";
senha:string="";

toLogin(){
  this.msg.set("")
  this.inicioVisivel=false
  this.loginVisivel=true
  this.registrarVisivel=false
}

login(email:string,pass:string){
 const e=email;
 const p=pass;


 const login:Login={
      "email":e,
      "senha":p
 }

this.service.logarUsuario(login).subscribe({
  next:(response)=>{  
      let token:string=response.token
      this.service.salvarToken(token);
      this.router.navigate(["/dashboard"])
  },
  error:()=>{
      this.msg.set("Verifique Seus Dados!")
  }
})
 
  
}

toRegistrar(){
  this.msg.set("")
  this.inicioVisivel=false
  this.loginVisivel=false
  this.registrarVisivel=true
}

formRegistrar=new FormGroup({
  nome:new FormControl("",[Validators.required,Validators.maxLength(55),Validators.minLength(2)]),
  apelido:new FormControl("",[Validators.required,Validators.maxLength(20),Validators.minLength(2)]),
  email:new FormControl("",[Validators.required,Validators.maxLength(100),Validators.minLength(5),Validators.email]),
  senha:new FormControl("",[Validators.required,Validators.maxLength(255),Validators.minLength(6)])
})








registrar(){





this.verficarNome()
this.verificarApelido()
this.verificarEmail()
this.verficarSenha()


if(this.formRegistrar.valid){
const usuario:Usuario={
    "nome":this.formRegistrar.get('nome').value.trim(),
    "username":this.formRegistrar.get('apelido').value.trim(),
    "email":this.formRegistrar.get('email').value.trim(),
    "senha":this.formRegistrar.get('senha').value.trim()
}




        this.service.registrarUsuario(usuario).subscribe({
          next:()=>{
            console.log("Usuario registrado!")
            this.msg.set("Usuario Registrado!")
            this.msgColor.set("white")

            setTimeout(()=>{
              this.msg.set("")
              this.msgColor.set("red")
              this.formRegistrar.reset()
            },1000)
          },
          error:(error)=>{
            this.msg.set(error.error.erro)

          }

        })
      }
}


verficarNome(){

const nome=this.formRegistrar.get('nome').value.trim()
const regex =/^[a-zA-Z0-9 ]+$/;




      if(this.formRegistrar.get('nome').errors?.['required']){
          this.msg.set('Nome deve ser obrigatorio!')
      }
      if(this.formRegistrar.get('nome').errors?.['minlength']){
          this.msg.set('Seu nome deve maior!')

      }
      if(this.formRegistrar.get('nome').errors?.['maxlength']){
          this.msg.set('seu nome deve ser menor')

      }

      if(!regex.test(nome)){
           this.msg.set('Nome em formato invalido')
           this.formRegistrar.get('nome').setErrors({caracteres:true})

      }
}



verificarApelido(){
     
  const nome=this.formRegistrar.get('apelido').value.trim()
  const regex =/^[a-zA-Z0-9]+$/;

  
      
      if(this.formRegistrar.get('apelido').errors?.['required']){
          this.msg.set('Apelido deve ser obrigatorio!')
      }
      if(this.formRegistrar.get('apelido').errors?.['minlength']){
          this.msg.set('Seu apelido deve maior!')
      }
      if(this.formRegistrar.get('apelido').errors?.['maxlength']){
          this.msg.set('Seu apelido deve ser menor')
      }
      if(!regex.test(nome)){
           this.msg.set('Apelido em formato invalido')
           this.formRegistrar.get('apelido').setErrors({caracteres:true})

      }

}

verificarEmail(){
   if(this.formRegistrar.get('email').errors?.['required']){
          this.msg.set('Email deve ser obrigatorio!')
      }
      if(this.formRegistrar.get('email').errors?.['minlength']){
          this.msg.set('Seu email deve maior!')
      }
      if(this.formRegistrar.get('email').errors?.['maxlength']){
          this.msg.set('Seu email deve ser menor')
      }
      if(this.formRegistrar.get('email').errors?.['email']){
            this.msg.set('Email invalido!')
           this.formRegistrar.get('email').setErrors({emailValid:true})

      }
}

verficarSenha(){
    if(this.formRegistrar.get('senha').errors?.['required']){
          this.msg.set('Senha deve ser obrigatorio!')
      }
      if(this.formRegistrar.get('senha').errors?.['minlength']){
          this.msg.set('Seu senha deve maior!')
      }
      if(this.formRegistrar.get('senha').errors?.['maxlength']){
          this.msg.set('Seu senha deve ser menor')
      }
}










}
