import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayfabService } from '../../../shared/playfab.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  users!: Observable<PlayFabAdminModels.PlayerProfile[] | undefined>;

  constructor(
    private service: PlayfabService) { }

  ngOnInit(): void {
    this.users = this.service.users;
    this.service.getPlayersInSegment();
  }
}
