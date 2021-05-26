import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { Becario } from 'src/app/models/Becario'
import { Type, UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  becarios: Becario[] = []
  editingBecario: Becario = {
    id: '',
    nombre: '',
    apellidos: '',
    fechaalta: '',
    horario: '',
    puesto: '',
    responsables: [],
  }

  backupBecario: Becario = {
    id: '',
    nombre: '',
    apellidos: '',
    fechaalta: '',
    horario: '',
    puesto: '',
    responsables: [],
  }

  isLoading: boolean = false

  action: string = 'Editar'

  constructor(private apiSvc: ApiService, private uiSvc: UiService) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = true
    this.apiSvc.getBecarios().subscribe(
      (data) => {
        this.becarios = data
      },
      (err) => {
        this.uiSvc.showToast(
          Type.Danger,
          'Error',
          'Hubo un error recuperando los datos',
        )
      },
      () => {
        this.isLoading = false
      },
    )
  }

  deleteBecario(becario: Becario) {
    if (becario.id == '') return
    this.apiSvc.deleteBecario(becario).subscribe(
      (data) => {
        this.uiSvc.showToast(Type.Success, 'Éxito', 'Eliminado correctamente')
        this.becarios.splice(this.becarios.indexOf(becario), 1)
      },
      (err) => {
        this.uiSvc.showToast(
          Type.Danger,
          'Error',
          'Hubo un error eliminando el dato',
        )
      },
    )
  }

  selectBecario(becario: Becario) {
    if (becario.id == '') return
    this.editingBecario = { ...becario }
  }

  editBecario() {
    this.apiSvc.editBecario(this.editingBecario).subscribe(
      (data) => {
        console.log(
          this.becarios.find((el) => {
            return el.id == this.editingBecario.id
          }),
        )
        this.becarios[
          this.becarios.findIndex((el) => {
            return el.id == this.editingBecario.id
          })
        ] = this.editingBecario
        this.uiSvc.showToast(Type.Success, 'Éxito', 'Editado correctamente')
      },
      (err) => {
        this.uiSvc.showToast(
          Type.Danger,
          'Error',
          'Hubo un error editando el dato',
        )
      },
    )
  }

  crearBecario() {
    this.apiSvc.createBecario(this.editingBecario).subscribe(
      (data) => {
        this.becarios.push(this.editingBecario)
      },
      (err) => {},
    )
  }

  resetBecario() {
    this.editingBecario = {
      id: '',
      nombre: '',
      apellidos: '',
      fechaalta: '',
      horario: '',
      puesto: '',
      responsables: [],
    }
  }
}
