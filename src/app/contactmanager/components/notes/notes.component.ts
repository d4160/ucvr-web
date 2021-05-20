import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Note } from '../../models/note';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {

  @Input() notes!: Observable<any | undefined>;

  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.notes.subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // trim for white spaces
  }

  openDialog(id: string): void {
    // this.dialog.open(NewContactDialogComponent, {
    //   width: '450px'
    // });
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      // if (result) {
      //   this.openSnackBar('Contact added', 'Navigate')
      //     .onAction().subscribe(() => {
      //       this.router.navigate(['/contactmanager', result.id]);
      //     });
      // }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
