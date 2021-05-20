import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PlayfabService } from '../../../shared/playfab.service';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  // user: User | undefined;
  users!: Observable<PlayFabAdminModels.PlayerProfile[] | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    // private service: UserService,
    private service: PlayfabService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      // let id = params['id'];

      // if (!id || !this.service.exists(id)) {
      //   this.router.navigate(['/contactmanager', 1]);
      //   id = 1;
      // }

      this.users = undefined;

      this.users = this.service.users;
      this.service.getPlayersInSegment();

      // this.service.users.subscribe(users => {
      //   if (users.length === 0) { return; }

      //   // Only for testing
      //   setTimeout(() => {
      //     this.user = this.service.userById(id);
      //   }, 500);
      // });

    });
  }
}
