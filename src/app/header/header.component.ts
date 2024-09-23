import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Client } from '../entity/client.Entity';
import { Panier } from '../entity/panier.Entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
 /*userDetails:any
  token: string |  null;
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,private toast:NgToastService
  ) { 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      mdp: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
        this.userDetails = this.service.userDetails();
    const storedToken = localStorage.getItem('myToken');
  }

  get email() { return this.loginForm.get('email') } hedhi login client just ma7touta w barra mazelt manich nesta arjet erreur deja
  get mdp() { return this.loginForm.get('mdp') }
  ngOnInit(): void {

   
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let client = new Client(data.email,data.mdp);
    console.log(client);
    if (
  
      data.email == 0 ||
      data.mdp == 0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.loginClient(client).subscribe(
        res=>{
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken",res.token);
          localStorage.setItem("role",res.role);
          this.router.navigate(['/']).then(()=>window.location.reload());
      },
       
        err=>{
          console.log(err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de Serveur',
          });
          
        }
      )
      
    }
    }*/



  /*token: string | null = null;
  
  constructor(private service: CrudService, private router: Router) { }

  

  ngOnInit(): void {
    
    const storedToken = localStorage.getItem('myToken');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  logout() {
    
    localStorage.removeItem('myToken');
    
    this.token = null;
    
    this.router.navigate(['']);
  }*/



  token: string |  null;
  userRole: string | null ;

userDetails:any
totalPanier:number=0;



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
