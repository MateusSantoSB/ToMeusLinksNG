import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home-ng',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home-ng.html',
  styleUrl: './home-ng.css'
})
export class HomeNg {

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
}

toRegistrar(){
  this.inicioVisivel=false
  this.loginVisivel=false
  this.registrarVisivel=true
}

registrar(nome:string,apelido:string,email:string,senha:string){

}

}
