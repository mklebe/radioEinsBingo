import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-lists',
  templateUrl: './previous-lists.component.html',
  styleUrls: ['./previous-lists.component.sass']
})
export class PreviousListsComponent implements OnInit {
  drugBoard: Board = drugs;

  constructor() { }

  ngOnInit(): void {
  }

}
interface BoardLineItem {
  artist: string;
  songName: string;
  placement: number;
}

interface Board {
  name: string;
  lines: Array<BoardLineItem>
}

const drugs: Board = {
  name: 'Flying High - Die 100 besten Drogen-Lieder',
  lines: [
    { placement: 1, songName: "Heroin", artist: "The Velvet Underground"},
    {placement: 2, songName: "White Rabbit", artist: "Jefferson Airplaine"},
    {placement: 3, songName: "The Drugs Don't Work", artist: "The Verve"},
    {placement: 4, songName: "Rehab", artist: "Amy Winehouse"},
    {placement: 5, songName: "I´m Waiting For The Man", artist: "The Velvet Undergound"},
    {placement: 6, songName: "Lucy In The Sky With Diamonds", artist: "The Beatles"},
    {placement: 7, songName: "The Needle And The Damage Done", artist: "Neil Young"},
    {placement: 8, songName: "Feel Good Hit Of The Summer", artist: "Queens Of The Stone Age"},
    {placement: 9, songName: "Purple Haze", artist: "The Jimi Hendrix Experience"},
    {placement: 10, songName: "Under The Bridge", artist: "Red Hot Chili Peppers"},
    {placement: 11, songName: "Golden Brown", artist: "The Stranglers"},
    {placement: 12, songName: "Cocaine", artist: "J. J. Cale"},
    {placement: 13, songName: "Drogen Nehmen Und Rumfahren", artist: "Die Zukunft"},
    {placement: 14, songName: "Am Tag, Als Conny Kramer Starb", artist: "Juliane Werding"},
    {placement: 15, songName: "Needle In The Hay", artist: "Elliott Smith"},
    {placement: 16, songName: "White Lines (Don't Don't Do It)", artist: "Grandmaster Flash & Melle Mel"},
    {placement: 17, songName: "Pusherman", artist: "Curtis Mayfield"},
    {placement: 18, songName: "Cold Turkey", artist: "John Lennon & Plastic Ono Band"},
    {placement: 19, songName: "Sister Morphine", artist: "The Rolling Stones"},
    {placement: 20, songName: "Comfortably Numb", artist: "Pink Floyd"},
    {placement: 21, songName: "Eight Miles High", artist: "The Byrds"},
    {placement: 22, songName: "Alkohol", artist: "Herbert Grönemeyer"},
    {placement: 23, songName: "Lithium", artist: "Nirvana"},
    {placement: 24, songName: "True Faith", artist: "New Order"},
    {placement: 25, songName: "You Need The Drugs", artist: "Westbam feat. Richard Butler"},
    {placement: 26, songName: "Gold Dust Woman", artist: "Fleetwood Mac"},
    {placement: 27, songName: "Beetlebum", artist: "Blur"},
    {placement: 28, songName: "Can't Feel My Face", artist: "The Weeknd"},
    {placement: 29, songName: "Because I Got High", artist: "Afroman"},
    {placement: 30, songName: "Hits From The Bong", artist: "Cypress Hill"},
    {placement: 31, songName: "I Wanna Be Sedated", artist: "Ramones"},
    {placement: 32, songName: "Cocaine In My Brain", artist: "Dillinger"},
    {placement: 33, songName: "Where Is My Mind?", artist: "Pixies"},
    {placement: 34, songName: "Higher Than The Sun", artist: "Primal Scream"},
    {placement: 35, songName: "Sister Morphine", artist: "Marianne Faithfull"},
    {placement: 36, songName: "Sorted For E's And Wizz", artist: "Pulp"},
    {placement: 37, songName: "Champagne Supernova", artist: "Oasis"},
    {placement: 38, songName: "Insane In The Brain", artist: "Cypress Hill"},
    {placement: 39, songName: "Perfect Day", artist: "Lou Reed"},
    {placement: 40, songName: "Mother I’ve Taken LSD", artist: "The Flaming Lips"},
    {placement: 41, songName: "Straight Edge", artist: "Minor Threat"},
    {placement: 42, songName: "Sex & Drugs & Rock & Roll", artist: "Ian Dury"},
    {placement: 43, songName: "Hurt", artist: "Nine Inch Nails"},
    {placement: 44, songName: "Mary Jane's Last Dance", artist: "Tom Petty & The Heartbreakers"},
    {placement: 45, songName: "My Friend Jack", artist: "The Smoke"},
    {placement: 46, songName: "Mother's Little Helper", artist: "The Rolling Stones"},
    {placement: 47, songName: "Ebeneezer Goode", artist: "The Shamen"},
    {placement: 48, songName: "Never Let Me Down Again", artist: "Depeche Mode"},
    {placement: 49, songName: "Ganz Wien", artist: "Falco"},
    {placement: 50, songName: "3 Tage Wach", artist: "Lützenkirchen"},
    {placement: 51, songName: "Master Of Puppets", artist: "Metallica"},
    {placement: 52, songName: "Bianco", artist: "Yung Hurn & RIN"},
    {placement: 53, songName: "Cigarettes & Alcohol", artist: "Oasis"},
    {placement: 54, songName: "Just One Fix", artist: "Ministry"},
    {placement: 55, songName: "The Pusher", artist: "Steppenwolf"},
    {placement: 56, songName: "Drugs", artist: "Upsahl"},
    {placement: 57, songName: "Mutter, Der Mann Mit Dem Koks Ist Da", artist: "Falco"},
    {placement: 58, songName: "Special K", artist: "Placebo"},
    {placement: 59, songName: "Swimming Pools (Drank)", artist: "Kendrick Lamar"},
    {placement: 60, songName: "Heute Schütte Ich Mich Zu", artist: "Karl Dall"},
    {placement: 61, songName: "Eight Miles High", artist: "Hüsker Dü"},
    {placement: 62, songName: "High By The Beach", artist: "Lana Del Rey"},
    {placement: 63, songName: "My Drug Buddy", artist: "The Lemonheads"},
    {placement: 64, songName: "Brown Sugar", artist: "The Rolling Stones"},
    {placement: 65, songName: "Hurt", artist: "Johnny Cash"},
    {placement: 66, songName: "White Punks On Dope", artist: "The Tubes"},
    {placement: 67, songName: "Cola-Wodka", artist: "Holger Biege"},
    {placement: 68, songName: "Alabama Song (Whisky Bar)", artist: "The Doors"},
    {placement: 69, songName: "Why’d You Only Call Me When You’re High?", artist: "Arctic Monkeys"},
    {placement: 70, songName: "I'm Your Pusher", artist: "Ice-T"},
    {placement: 71, songName: "Hash Pipe", artist: "Weezer"},
    {placement: 72, songName: "Brown Sugar", artist: "D'Angelo"},
    {placement: 73, songName: "Tag Am Meer", artist: "Die Fantastischen Vier"},
    {placement: 74, songName: "Sugar Man", artist: "Rodriguez"},
    {placement: 75, songName: "Mix Mir Einen Drink", artist: "Feeling B"},
    {placement: 76, songName: "Mary Jane", artist: "Rick James"},
    {placement: 77, songName: "Bongzimmer", artist: "SXTN"},
    {placement: 78, songName: "Crystal Meth In Brandenburg", artist: "Grim104"},
    {placement: 79, songName: "Hotel California", artist: "Eagles"},
    {placement: 80, songName: "Cocaine", artist: "Eric Clapton"},
    {placement: 81, songName: "Willst Du", artist: "Alligatoah"},
    {placement: 82, songName: "Needle Of Death", artist: "Bert Jansch"},
    {placement: 83, songName: "Kokain", artist: "Hannes Wader"},
    {placement: 84, songName: "I Got 5 On It", artist: "Luniz"},
    {placement: 85, songName: "Rainy Day Women #12 & 35", artist: "Bob Dylan"},
    {placement: 86, songName: "Karlsquell", artist: "Slime"},
    {placement: 87, songName: "Xanny", artist: "Billie Eilish"},
    {placement: 88, songName: "Ashes To Ashes", artist: "David Bowie"},
    {placement: 89, songName: "White Horse", artist: "Laid Back"},
    {placement: 90, songName: "We Are All On Drugs", artist: "Weezer"},
    {placement: 91, songName: "Not If You Were The Last Junkie On Earth", artist: "The Dandy Warhols"},
    {placement: 92, songName: "Pass That Dutch", artist: "Missy Elliott"},
    {placement: 93, songName: "Lost", artist: "Frank Ocean"},
    {placement: 94, songName: "Blinded By The Lights", artist: "The Streets"},
    {placement: 95, songName: "Sam Stone", artist: "John Prine"},
    {placement: 96, songName: "Nicotine", artist: "Chef'Special"},
    {placement: 97, songName: "Novacane", artist: "Frank Ocean"},
    {placement: 98, songName: "Strychnine", artist: "The Sonics"},
    {placement: 99, songName: "King Heroin", artist: "James Brown"},
    {placement: 100, songName: "Zeit Steht", artist: "Trettmann feat. Alli Neumann"},
  ]
}
