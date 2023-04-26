import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  characterId: string = '';
  character: any = null;
  episodes: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {
    this.characterId = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter() {
    this.rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        this.character = res;
        this.getEpisodes();
      },
      error: (error: any) => {},
    });
  }

  getEpisodes() {
    for (let url of this.character.episode) {
      this.rickAndMortyService.getByUrl(url).subscribe({
        next: (res: any) => {
          this.episodes.push(res);
        },
        error: (error: any) => {},
      });
    }
  }
}
