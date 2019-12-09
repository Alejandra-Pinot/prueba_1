import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeticionesService } from '../../services/peticiones.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title:string;
  motivo:any={motivo:0,des_motivo:'', estado:'', tipo:''};
  constructor(
    private _peticiones: PeticionesService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    //this.title=(this.data.edit)?'Editar': 'Agregar';
    if(this.data.edit){
      this.title='Editar';
      this.motivo.motivo=this.data.element.motivo;
      this.motivo.des_motivo=this.data.element.des_motivo;
      this.motivo.estado=this.data.element.estado;
      this.motivo.tipo=this.data.element.tipo;
    }else{
      this.title='Agregar';
    }
  }

  ngOnInit() {}

  closeModal(){
    this.motivo={motivo:0,des_motivo:'', estado:'', tipo:''};
    this.dialogRef.close();
  }

  async pushData(){
    await this._peticiones.pushData(this.motivo).subscribe(data=>{
      if (!data.hasOwnProperty('error')){
        this.dialogRef.close();
      }else{
        console.log(data.error);
      }
    });
  }

  validateData(){
    if(this.motivo.des_motivo=='' || this.motivo.estado=='' || this.motivo.tipo==''){
      console.log("Llene todos los campos");
      this._snackBar.open('Es necesario llenar todos los campos.', '', {
        duration: 2000,
      });
    }else{
      if(!this.data.edit){
        this.pushData();
      }else{
        this.editData();
      }
    }
  }

  async editData(){
    await this._peticiones.editData(this.motivo).subscribe(data=>{
      if (!data.hasOwnProperty('error')){
        this.dialogRef.close();
      }else{
        console.log(data.error);
      }
    });
  }


}
