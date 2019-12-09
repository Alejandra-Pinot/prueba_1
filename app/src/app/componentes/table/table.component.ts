import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
import { PeticionesService } from '../../services/peticiones.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //data:any = {};
  data: MatTableDataSource<any>;
  view: boolean;
  asc:boolean;
  displayedColumns: string[] = ['numero', 'motivo', 'descripcion', 'estado', 'tipo', 'acciones'];

  constructor(
    private _peticiones: PeticionesService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,) {
    this.view=false;
    this.asc=true;
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    await this._peticiones.getData().subscribe(data=>{
      if (!data.hasOwnProperty('error')){
        this.data = new MatTableDataSource(data.data);
        this.view=true;
      }else{
        console.log(data.error);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  async orderData(){
    await this._peticiones.orderData(this.asc).subscribe(data=>{
      this.asc=!this.asc;
      if (!data.hasOwnProperty('error')){
        this.data = new MatTableDataSource(data.data);
      }else{
        console.log(data.error);
      }
    });
  }

  edit(element){
    const dialogRef = this.dialog.open(ModalComponent, {
      width:'400px',
      data: {edit:true, element:element}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this._snackBar.open('Registro editado con éxito.', '', {
        duration: 2000,
      });
    });
  }

  create(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width:'400px',
      data: {edit:false}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this._snackBar.open('Registro creado con éxito.', '', {
        duration: 2000,
      });
    });
  }


  delete(element){
    this._peticiones.deleteData(element.motivo).subscribe(data=>{
      if (!data.hasOwnProperty('error')){
        this.getData();
        this._snackBar.open(data.success, '', {
          duration: 2000,
        });
      }else{
        console.log(data.error);
      }
    });
  }

}
