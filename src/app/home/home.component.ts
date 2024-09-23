import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Fournisseur } from '../Entity/fournisseur.Entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalAdmins:number=0;
  totalClient:number=0;
  totalFournisseur:number=0;
  totalLivreur:number=0;
 
  constructor(
    private service:CrudService,
  ) { 
    
  }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(admin =>{
      this.totalAdmins=admin.length})
             
    this.service.getClient().subscribe(client =>{
      this.totalClient=client.length})


    this.service.getFournisseur().subscribe(fournisseur =>{
      this.totalFournisseur=fournisseur.length})
      
      
    this.service.getLivreur().subscribe(livreur =>{
      this.totalLivreur=livreur.length})
  }
}
