import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../Model/Login';
import { Servico } from '../servico';
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

email:string="";
senha:string="";

toLogin(){
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
      console.log("usuario não logado!")
  }
})
 
  
}

toRegistrar(){
  this.inicioVisivel=false
  this.loginVisivel=false
  this.registrarVisivel=true
}

registrar(nome:string,apelido:string,email:string,senha:string){
const usuario:Usuario={
    "nome":nome,
    "username":apelido,
    "email":email,
    "senha":senha
}
this.service.registrarUsuario(usuario).subscribe({
  next:(response)=>{
    console.log("Usuario registrado!")
  },
  error:()=>{
    console.log("Usuario não registrado!")
  }

})



}

}
