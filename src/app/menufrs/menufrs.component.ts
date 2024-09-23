import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-menufrs',
  templateUrl: './menufrs.component.html',
  styleUrls: ['./menufrs.component.css']
})
export class MenufrsComponent {
  token: string |  null;
  userRole: string | null ;

userDetails:any



constructor(private router:Router,private service:CrudService) {  }



  
ngOnInit(): void {
  this.userDetails = this.service.userDetails();

  //bech na7i connexion ki na3ml login 
  const storedToken = localStorage.getItem('myToken');
  if (storedToken) {
    this.token = storedToken;
  }
  //w naffichi 7aja 7aseb role mta3ha w role n7ote fi login.ts mta3 
  const storedUserRole = localStorage.getItem('role');
  if (storedUserRole) {
    this.userRole = storedUserRole;
  }
}

deconnexion(){
  console.log("logout");
  localStorage.clear()
 
  this.router.navigate(['']).then(()=>{window.location.reload()});
}
}
