import { Component } from '@angular/core';
// import { Component, inject } from '@angular/core';
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';  // 28.03.2023 Diese Objekte und Funktionen werden verwendet,
// // ...um Daten aus der Firebase Firestore zu lesen und zu schreiben.
// import { Observable } from 'rxjs';  // 28.03.2023 Erstellung einer Datenströmung, die von der Firebase Firestore abgerufen wird

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ringoffire';
  // firestore: Firestore = inject(Firestore)  // 28.03.2023
  // items$: Observable<any[]>;  // 28.03.2023 Der Datenstrom, der später von der Firebase Firestore abgerufen wird

  constructor() {  // 28.03.2023
    // const aCollection = collection(this.firestore, 'items')  // Firestore-Sammlung wird mit dem Namen "items" erstellt...
    // this.items$ = collectionData(aCollection);  // ...und in der "aCollection"-Variable gespeichert
    // // collectionData"-Funktion lädt die Daten aus der Sammlung in den "items$"-Datenstrom
  }
}


