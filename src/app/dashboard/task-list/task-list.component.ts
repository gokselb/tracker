import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '@tts/models';
import { JobService } from '@tts/services/job';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddJobComponent } from '../add-job/add-job.component';
import { UtilsService } from '@tts/services/utils.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<Job> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'invoiceNo',
    'type',
    'jobName',
    'customer',
    'date',
    'place',
    'secretary',
    'interpreters',
    'payDate',
    'total',
    'remaining',
  ];

  constructor(
    private jobService: JobService,
    public dialog: MatDialog,
    public utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.jobService.getAll().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
  public addData() {
    const dialogRef = this.dialog.open<AddJobComponent>(AddJobComponent, {
      data: { allData: this.dataSource.data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      const job: Job = result;
      job.startDate = this.utils.convertToTimestamp(result.startDate);
      job.endDate = this.utils.convertToTimestamp(result.endDate);
      job.payDate = this.utils.convertToTimestamp(result.payDate);
      if (result) {
        this.jobService.create(result);
      }
    });
  }
  public removeData() {}
}
