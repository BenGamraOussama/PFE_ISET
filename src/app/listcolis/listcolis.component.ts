import { Component } from '@angular/core';
import { CommandeProduit } from '../Entity/commadeProduitEntity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcolis',
  templateUrl: './listcolis.component.html',
  styleUrls: ['./listcolis.component.css']
})
export class ListcolisComponent {
  p: number = 1;
  collection: any[] = [];
  listCommandeProduit: CommandeProduit[] = [];

  constructor(private  service: CrudService) {}

  ngOnInit(): void {
    this.service.getCommandeProduit().subscribe(commandeProduit => {
      this.listCommandeProduit = commandeProduit;
    });
  }
}
