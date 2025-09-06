import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../service/servico';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
const service=inject(Servico)
const router=inject(Router)

const token = localStorage.getItem('token');


if(req.url.includes('/l')){
  
if (token ) { 
 
  const tokenExp=service.convertenEXPToken()
  let hora=Date.now()

  console.log(tokenExp.getTime())
  console.log(hora)

if(tokenExp.getTime()> hora){
  const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }else{
      localStorage.removeItem('token')
      router.navigate([''])
  }
  
  
  }





}
  return next(req);




};
