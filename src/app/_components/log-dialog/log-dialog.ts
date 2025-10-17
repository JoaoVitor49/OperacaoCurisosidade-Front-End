import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Log, LogData } from '../../models/log.model';
import { StatusPipe } from '../../pipes/status.pipe';
import { FieldNamePipe } from "../../pipes/fieldName.pipe";
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-log-dialog',
  imports: [MatDialogModule, StatusPipe, FieldNamePipe, DatePipe, MatIconModule],
  templateUrl: './log-dialog.html',
  styleUrl: './log-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogDialog implements OnInit {
  private matDialogData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<LogDialog>);
  log = signal<Log>(this.matDialogData);
  differences = signal<{ field: string, oldValue: any, newValue: any }[]>([]);
  
  ngOnInit(): void{
    this.getDifferences();
  }

  getDifferences(): void{
    const oldData = this.log().oldData || {};
    const newData = this.log().newData || {};
    const diffs: { field: string, oldValue: any, newValue: any }[] = [];

    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

    allKeys.forEach(key => {
      const oldValue = oldData[key as keyof LogData];
      const newValue = newData[key as keyof LogData];

      if (oldValue !== newValue) {
        diffs.push({ field: key, oldValue: oldValue, newValue: newValue });
      }
    });
    
    this.differences.set(diffs);
  }

  onClose(): void{
    this.dialogRef.close();
  }
}