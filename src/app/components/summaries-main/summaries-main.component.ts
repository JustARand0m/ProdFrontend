import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { SummeriesService } from 'src/app/core/services/summeries.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { SummariesInterface } from 'src/app/core/models/summaries-interface';
import { FolderInterface } from 'src/app/core/models/folder-interface';
import { FolderService } from 'src/app/core/services/folder.service';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

// todo -> maybe move List and Quill editor as an own Component
@Component({
  selector: 'app-summaries-main',
  templateUrl: './summaries-main.component.html',
  styleUrls: ['./summaries-main.component.scss'],
})
export class SummariesMainComponent implements OnInit, AfterViewChecked {
  // Observable that reacts to changes in ngrx-store
  public summaries$: Observable<SummariesInterface[]>;
  // folder-id passed over the url
  public folderId: string;
  public folder: FolderInterface;

  public edit = false;
  public editFolderName = false;
  public enterName = false;
  public uploadError = false;
  public editSummaryName: SummariesInterface = null;
  // The summary selected at the moment
  public currentSummary: SummariesInterface = null;

  // The Input elements to change the Names
  @ViewChildren('folderNameInput, nameInput, nameInputEdit')
  private nameChange: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private summariesService: SummeriesService,
    private folderService: FolderService,
    private store: Store<{summaries: SummariesInterface[]}>,
    private connection: ConnectionService,
    private matDialog: MatDialog,
  ) {
    // Subsribes the Observable to ngrx Store
    this.summaries$ = store.pipe(
      select('summaries'),
      map(result => result.summaries)
    );
    this.summaries$.subscribe();
  }

  ngOnInit() {
    // loads the current content of the page
    this.folderId = this.route.snapshot.paramMap.get('id');
    this.connection.connected$.subscribe((connected) => {
      if (connected) {
        this.summariesService.get(this.folderId).subscribe();
        this.folderService.get(this.folderId).subscribe((res) => {
          this.folder = res[0];
        });
      }
    });
    this.currentSummary = {
      folderId: +this.folderId,
      topic: null,
      content: null,
    };
  }

  ngAfterViewChecked(): void {
    if (this.editFolderName || this.editSummaryName || this.enterName) {
      // Todo -> remove setTimeout which is only a workaround for change detection
      setTimeout(() => {
        if (this.nameChange) {
          this.nameChange.forEach((elem) => {
            elem.nativeElement.focus();
          });
        }
      });
    }
  }

  /**
   * This function is executed if the user confirms the new summary that is added.
   * It will create a new summary in the database.
   *
   * @param name The name of the newly created Summary
   */
  public addSummary(name: string) {
    const summary: SummariesInterface = {
      folderId: +this.folderId,
      topic: name,
      content: '',
    };
    this.enterName = false;
    this.summariesService.save(summary).subscribe();
  }

  /**
   * This function gets triggered when the user clicks a different summary,
   * it will switch im to the contents of the selected summary.
   * 
   * @param summary the summary the user clicked on
   */
  public summaryChosen(summary: SummariesInterface) {
    this.currentSummary = summary;
  }

  /**
   * This function gets triggered if the user saves the content of a summary.
   * This will update the summary in the database with the new written content.
   */
  public saveSummary() {
    this.edit = !this.edit;
    this.summariesService.update(this.currentSummary).subscribe(
      () => this.uploadError = false,
      (err) => this.uploadError = true
    );
  }

  /**
   * This function renames the currentSummary to the name entered in the
   * text-input.
   * @param name the new name
   */
  public updateSummaryName(name: string) {
    this.currentSummary.topic = name;
    this.editSummaryName = null;
    this.summariesService.update(this.currentSummary).subscribe(
      () => this.uploadError = false,
      (err) => this.uploadError = true
    );

  }
  /**
   * This function is triggered when the user clicks the trashcan simbol.
   * It will show a modal window, in which the user can confirm his actions.
   * If he does confim them the selected summary will get deleted.
   */
  public deleteSummary() {
    const dialogRef = this.matDialog.open(DeleteModalComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: {
        type: 'Summary',
        message: this.currentSummary.topic
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.summariesService.delete(this.currentSummary.id).subscribe();
        this.currentSummary = {
          folderId: +this.folderId,
          topic: null,
          content: null,
        };
      }
    });
  }

  /**
   * This function gets triggered when the user clicks the trashcan for the folder.
   * It will show a modal window in which the user has to confirm his actions.
   * If he does the Folder with all the summaries will get deleted from the database.
   */
  public deleteFolder() {
    const dialogRef = this.matDialog.open(DeleteModalComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: {
        type: 'Folder',
        message: this.folder.name
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.folderService.delete(this.folder.id).subscribe();
        this.router.navigate(['/summaries']);
      }
    });
  }

  /**
   * Function that allows the user to change the foldername
   */
  public changedFolderName() {
    this.editFolderName = !this.editFolderName;
    this.folderService.update(this.folder).subscribe();
  }
}
