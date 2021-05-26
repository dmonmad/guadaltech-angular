import { Injectable } from '@angular/core'
import { IndividualConfig, ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private toastr: ToastrService) {}

  showToast(type: Type, title: string, text: string) {
    let options = {
      closeButton: true,
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 4000,
    }
    switch (type) {
      case Type.Success:
        this.toastr.success(title, text, options)
        break
      case Type.Warning:
        this.toastr.warning(title, text, options)
        break
      case Type.Danger:
        this.toastr.error(title, text, options)
        break
    }
  }
}

export enum Type {
  Success,
  Warning,
  Danger,
}
