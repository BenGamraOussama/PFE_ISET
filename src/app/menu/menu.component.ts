import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Admin } from '../Entity/admin.Entity';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  role:string;
  public constructor(private service:CrudService,private router:Router){}

  //afficherLivreur
  ngOnInit():void{
    this.role=localStorage.getItem("role")as string;  
  }
  isCollapsed: { [key: string]:boolean} = {
    'admin':true,
    'client':true,
    'fournisseur':true,
    'livreur':true,
    'produit':true,
    'contact':true,
    'coli':true,
    'categorie':true,
  }
  toggleCollapse(section: string):void{
    this.isCollapsed[section] = !this.isCollapsed[section];
  }
}
