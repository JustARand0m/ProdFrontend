import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule,
   MatBottomSheetModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatMenuModule,
   MatTableModule, MatStepperModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosComponent } from './pages/todos/todos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FitComponent } from './pages/fit/fit.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { StoreModule } from '@ngrx/store';
import { todoRed } from './store/todo.reducer';
import { folderRed } from './store/folder.reducer';
import { summariesRed } from './store/summaries.reducer';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SecureImageComponent } from './components/secure-image/secure-image.component';
import { FoodComponent } from './pages/food/food.component';
import { AuthInterceptor } from './core/interceptors/AuthInterceptor';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DailyNutrOverviewComponent } from './components/daily-nutr-overview/daily-nutr-overview.component';
import { MealsStepperComponent } from './components/meals-stepper/meals-stepper.component';
import { SearchFoodComponent } from './components/search-food/search-food.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DisplayFoodComponent } from './components/display-food/display-food.component';
import { ChangeDailyGoalComponent } from './components/change-daily-goal/change-daily-goal.component';
import { CustomFoodComponent } from './components/custom-food/custom-food.component';
import { SummariesComponent } from './pages/summaries/summaries.component';
import { SummariesMainComponent } from './components/summaries-main/summaries-main.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { QuillModule } from 'ngx-quill';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { AddFitRowComponent } from './components/add-fit-row/add-fit-row.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    SettingsComponent,
    FitComponent,
    AddTodoComponent,
    TodoCardComponent,
    SecureImageComponent,
    FoodComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DailyNutrOverviewComponent,
    MealsStepperComponent,
    SearchFoodComponent,
    DisplayFoodComponent,
    ChangeDailyGoalComponent,
    CustomFoodComponent,
    SummariesComponent,
    SummariesMainComponent,
    AddFolderComponent,
    DeleteModalComponent,
    AddFitRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        clipboard: {
          matchVisual: false
        }
      }
    }),

    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    MatListModule,
    ScrollingModule,

    StoreModule.forRoot({todos: todoRed, folder: folderRed, summaries: summariesRed}),
  ],
  entryComponents: [
    AddTodoComponent,
    ChangeDailyGoalComponent,
    CustomFoodComponent,
    AddFolderComponent,
    AddFitRowComponent,
    DeleteModalComponent],
  providers: [
    MatDatepickerModule,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
