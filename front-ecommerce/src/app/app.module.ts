import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component'; // ✅ Direct import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomePageComponent, // ✅ Standalone component is imported directly
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
