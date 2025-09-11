import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Model/Login';
import { Observable } from 'rxjs';
import { Usuario } from '../Model/Usuario';
import { Link } from '../Model/Link';

@Injectable({
  providedIn: 'root'
})
export class Servico {
  
constructor(private http:HttpClient){

}
urlBack:string="https://welcome-hermia-mateussantos-557076e4.koyeb.app"

logarUsuario(login:Login):Observable<any>{
    return this.http.post<Login>(this.urlBack+"/login",login) 
}

registrarUsuario(usuario:Usuario):Observable<any>{
  return this.http.post<Usuario>(this.urlBack+"/u/cadastro",usuario)
}

salvarToken(token:string){
localStorage.setItem('token',token)
}

buscarToken(){
  let token=localStorage.getItem('token')
  if(token!=null){
  let payload = token.split('.')[1]; 
  let dados = JSON.parse(atob(payload)); 
  return dados;
  }
  return null
}

convertenEXPToken(){
  const token=localStorage.getItem('token')
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expDate = new Date(payload.exp * 1000); 
  return expDate;
}


adicionarLink(link:Link,username:string):Observable<any>{
    return this.http.post<Link>(this.urlBack+"/l/link/"+username,link)
}

buscaLinksUsuario(username:string):Observable<Link[]>{
  return this.http.get<Link[]>(this.urlBack+"/l/link/user/"+username)
}

buscarLink(username:string,titulo:string):Observable<Link>{
  return this.http.get<Link>(this.urlBack+"/l/src/"+username+"/"+titulo)
}

deletarLink(username:string,titulo:string):Observable<any>{
  return this.http.delete<any>(this.urlBack+"/l/link/del/"+username+"/"+titulo)
}

editarLink(username:string,titulo:string,link:Link):Observable<Link>{
  return this.http.put<Link>(this.urlBack+"/l/att/"+username+"/"+titulo,link)
}

buscarUsuarioUser(username:string):Observable<Usuario>{
  return this.http.get<Usuario>(this.urlBack+"/u/public/"+username)
}



}
