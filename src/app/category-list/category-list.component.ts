import { Component, OnInit } from '@angular/core';
import { animals, Board, BoardLineItem, drugs, family, numbers } from '../previous-lists/lists';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  searchTerm: string = '';
  searchResult: Array<BoardLineItem> = []

  categories: Array<Board> = [
    drugs, animals, family, numbers,
  ];

  constructor() { }

  searchArtist(): void {
    this.searchResult = [
      ... drugs.lines,
      ... animals.lines,
      ... family.lines,
      ... numbers.lines
    ].filter((item) => {
      return item.artist.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
  }

  ngOnInit(): void {
  }

}
