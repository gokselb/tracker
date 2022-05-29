import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [JobService],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<Job> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'invoiceNo',
    'type',
    'company',
    'client',
    'assignment',
    'startDate',
    'place',
    'interpreters',
    'amount',
    'isPaid',
    'options'
  ];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private jobService: JobService,
    public dialog: MatDialog,
    public utils: UtilsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 100);
  }

  public getData(): void {
    this.jobService.getAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
    });
  }
  public addData() {
    const dialogRef = this.dialog.open<AddJobComponent>(AddJobComponent, {
      data: { allData: this.dataSource.data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        const job: Job = result;
        job.startDate = this.utils.convertToTimestamp(result.startDate);
        job.endDate = this.utils.convertToTimestamp(result.endDate);
        job.payDate = this.utils.convertToTimestamp(result.payDate);
        this.jobService.create(result);
      }
    });
  }

  public updateValue(job: Job): void {
    this.jobService.update(job);
  }

  // TODO: To implement
  public removeData() {}
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
