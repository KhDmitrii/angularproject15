import { Component, OnInit } from '@angular/core';
import { Personal } from './shared/interfaces/personal.interface';
import { PersonalService } from './shared/services/personal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  personals: Personal[];

  constructor(private personalService: PersonalService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.personals = (await this.personalService.getPersonals()) || [];
    } catch (error) {
      console.log(error);
    }
  }

  async save(personal: Personal) {
    try {
      await this.personalService.postPersonal(personal);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async edit(id: number, personal: Personal) {
    try {
      await this.personalService.putPersonal(id, personal);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number) {
    try {
      await this.personalService.deletePersonal(id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }
}
