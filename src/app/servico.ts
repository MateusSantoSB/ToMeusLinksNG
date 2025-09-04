import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './Model/Login';
import { Observable } from 'rxjs';
import { Usuario } from './Model/Usuario';
import { Link } from './Model/Link';

@Injectable({
  providedIn: 'root'
})
export class Servico {
  
constructor(private http:HttpClient){

}
urlBack:string="http://localhost:8080"

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

adicionarLink(link:Link,id:string):Observable<any>{
    return this.http.post<Link>(this.urlBack+"/l/link/"+id,link)
}

buscaLinksUsuario(id:string):Observable<Link[]>{
  return this.http.get<Link[]>(this.urlBack+"/l/link/"+id)
}

deletarLink(id:string,titulo:string):Observable<any>{
  return this.http.delete<any>(this.urlBack+"/l/link/del/"+id+"/"+titulo)
}

}
