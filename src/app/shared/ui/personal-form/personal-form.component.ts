import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personal } from '../../interfaces/personal.interface';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css'],
})
export class PersonalFormComponent implements OnInit {
  @Input() personal!: Personal;
  @Output() onSave = new EventEmitter<Personal>();

  personalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      surname: [null, [Validators.required, Validators.maxLength(100)]],
      patronymic: [null, [Validators.maxLength(100)]],
      ready: [null, [Validators.required, Validators.requiredTrue]],
    };

    this.personalForm = this.fb.group(controls);

    if (this.personal) {
      this.personalForm.patchValue(this.personal);
    }
  }

  save() {
    const personal = this.personalForm.value;
    this.onSave.emit(personal);
  }
}
