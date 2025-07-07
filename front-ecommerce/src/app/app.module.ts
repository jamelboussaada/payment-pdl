import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component'; // ✅ Direct import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomePageComponent, // ✅ Standalone component is imported directly
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
