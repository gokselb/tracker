import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '@tts/models';
import { Observable } from 'rxjs';
import { distinct, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  private allData: Job[] = [];

  public form: FormGroup;

  public filteredOptions: {
    [key: string]: Observable<(string | undefined)[]>;
  } = {};
  constructor(
    public dialogRef: MatDialogRef<AddJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allData: Job[] }
  ) {
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
      currency: new FormControl(''),
      user: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.setFilteredOptions();
  }

  public setFilteredOptions() {
    let getObservable = (field: keyof Job) => {
      return this.form.controls[field].valueChanges.pipe(
        startWith(''),
        map((value) => {
          let result = this._filter(value, field);
          console.log(result);
          return [...new Set(result)];
        })
      );
    };
    const fields: (keyof Job)[] = [
      'type',
      'jobName',
      'customer',
      'country',
      'city',
      'secretary',
    ];
    fields.forEach((field) => {
      this.filteredOptions[field] = getObservable(field);
    });
  }

  private _filter(value: string, key: keyof Job): (string | undefined)[] {
    const filterValue = value.toLowerCase();

    return this.getDataBy(key).filter((option) =>
      option?.toLowerCase().includes(filterValue)
    );
  }

  public getDataBy(field: keyof Job) {
    return this.allData
      .map((val) => val[field]?.toString())
      .filter((val) => !!val);
  }

  public submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
