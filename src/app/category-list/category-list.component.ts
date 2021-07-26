import { Component, OnInit } from '@angular/core';
import { animals, Board, BoardLineItem, drugs, family, numbers } from '../previous-lists/lists';

interface Category {
  displayName: string;
  name: string;
  isClosed: boolean;
  imageUrl: string
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {
  categoryList: Array<Category> = [
    {
      displayName: 'We Are Family - Die 100 besten Familienlieder',
      name: 'Top100Family',
      isClosed: true,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_familie_16_92.png.png/quality=205/size=300x170.png'
    },
    {
      displayName: 'Magic Numbers - Die 100 besten Songs mit Zahlen im Titel',
      name: 'Top100Numbers',
      isClosed: true,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_zahlen_16_92.png.png/quality=205/size=300x170.png'
    },
    {
      displayName: 'Animals - Die 100 besten Lieder mit Tieren',
      name: 'Top100Animals',
      isClosed: true,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_tiere_16_92.png.png/quality=205/size=300x170.png'
    },
    {
      displayName: 'Flying High - Die 100 besten Drogenlieder',
      name: 'Top100Drugs',
      isClosed: true,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_drogen_16_91.png.png/quality=205/rendition=drogen43n.png/size=300x170.png'
    },
    {
      displayName: 'Eighties - Die 100 besten Lieder der 80er',
      name: 'Top100Eighties',
      isClosed: true,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/top100_80er_16.png.png/quality=205/rendition=musiksommer_achtziger_4_3.png/size=300x170.png'
    },
    {
      displayName: 'On The Road - Die 100 besten Mobilitätslieder',
      name: 'Top100Mobility',
      isClosed: false,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_mobilitaet_16_92.png.png/quality=205/rendition=musiksommer_mobilitaet_4_3.png/size=300x170.png'
    },
    {
      displayName: 'Instrumentals - Die 100 besten Instrumentallieder',
      name: 'Top100Instrumentals',
      isClosed: false,
      imageUrl: 'https://www.radioeins.de/content/dam/rbb/rad/bilder0/202106/musiksommer_instrumental_16_92.png.png/quality=205/rendition=musiksommer_instrumental_4_3.png/size=300x170.png'
    },
  ];

  upcomingLists: Array<Category> = this.categoryList.filter( cat => !cat.isClosed )
  closedLists: Array<Category> = this.categoryList.filter( cat => cat.isClosed )

  searchTerm: string = '';
  searchResult: Array<BoardLineItem> = []

  categories: Array<Board> = [
    drugs, animals, family, numbers,
  ];

  constructor() { }

  searchArtist(): void {
    this.searchResult = [
      ...drugs.lines,
      ...animals.lines,
      ...family.lines,
      ...numbers.lines
    ].filter((item) => {
      return item.artist.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
  }

  ngOnInit(): void {
  }

}
