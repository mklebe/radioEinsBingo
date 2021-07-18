import { Component, OnInit } from '@angular/core';
import { animals, Board, drugs, family, numbers } from './lists';

@Component({
  selector: 'app-previous-lists',
  templateUrl: './previous-lists.component.html',
  styleUrls: ['./previous-lists.component.sass']
})
export class PreviousListsComponent implements OnInit {
  drugBoard: Board = drugs;
  animalBoard: Board = animals;
  numberBoard: Board = numbers;
  familyBoard: Board = family;

  constructor() { }

  ngOnInit(): void {
  }

}