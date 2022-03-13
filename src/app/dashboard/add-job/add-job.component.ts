import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '@tts/models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  private allData: Job[] = [];

  public form: FormGroup;

  public filteredOptions: { [key: string]: Observable<string[]> } = {};
  constructor(public dialogRef: MatDialogRef<AddJobComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {allData: Job[]},) {
      this.allData = data.allData;
    this.form = new FormGroup({
      id: new FormControl(''),
      invoiceNo: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      jobName: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      secretary: new FormControl(''),
      interpreters: new FormControl(''),
      total: new FormControl(''),
      remaining: new FormControl(''),
      payDate: new FormControl(''),
      currency: new FormControl(''),
      user: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.setFilteredOptions();
  }

  public setFilteredOptions() {
    this.filteredOptions = {
      type: this.form.controls.type.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value, 'type'))
      ),
    };
  }

  private _filter(value: string, key: keyof Job): string[] {
    const filterValue = value.toLowerCase();

    return this.getDataBy(key).filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public getDataBy(field: keyof Job) {
    return this.allData.map((val) => val[field].toString());
  }

  public submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
