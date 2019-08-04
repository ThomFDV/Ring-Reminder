import { Component, OnInit } from '@angular/core';
import {DateService} from '../../services/date.service';
import {RingModel} from '../../models/ring.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html',
  styleUrls: ['./date-view.component.sass']
})
export class DateViewComponent implements OnInit {

  rings: RingModel[] = [];
  newDate: Date;
  open = false;
  ringForm: FormGroup;

  constructor(private dateService: DateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.ringForm = this.fb.group({
      date: ['', [Validators.required]]
    });
    this.getRings();
  }

  getRings() {
    this.dateService.getRings().subscribe((res) => {
      this.rings = res;
      this.rings.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.newDate =  new Date(this.rings[0].createdAt);
      this.newDate.setDate(this.newDate.getDate() + 28);
      console.log(JSON.stringify(this.rings));
    }, err => {
      alert('A problem occurred');
    });
  }

  addRing() {
    let posNumber;
    if (this.rings[0].number + 1 > 3) {
      posNumber = 1;
    } else {
      posNumber = this.rings[0].number + 1;
    }
    const date = new Date();

    this.dateService.addRingToday(posNumber, date).subscribe((res) => {
      this.rings.push(res);
      this.rings.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    });
    return;
  }

  onSubmit() {
    let posNumber;
    if (this.rings[0].number + 1 > 3) {
      posNumber = 1;
    } else {
      posNumber = this.rings[0].number + 1;
    }
    this.dateService.addRingToday(posNumber, this.ringForm.value.date).subscribe((res) => {
      this.rings.push(res);
      this.rings.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    });
  }
}
