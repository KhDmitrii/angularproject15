import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personal } from '../../interfaces/personal.interface';

@Component({
  selector: 'app-personal-item',
  templateUrl: './personal-item.component.html',
  styleUrls: ['./personal-item.component.css'],
})
export class PersonalItemComponent implements OnInit {
  @Input() personal!: Personal;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onSave = new EventEmitter<Personal>();

  personalForm!: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      surname: [null, [Validators.required, Validators.maxLength(100)]],
      patronymic: [null, [Validators.maxLength(100)]],
    };

    this.personalForm = this.fb.group(controls);

    if (this.personal) {
      this.personalForm.patchValue(this.personal);
    }
  }

  delete() {
    this.onDelete.emit(this.personal.id);
  }

  save() {
    const personal = this.personalForm.value;
    this.onSave.emit(personal);
    this.editMode = false;
  }
}
