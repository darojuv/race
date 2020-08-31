import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppService } from '../app.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(['/memberdetails/0']);
  }

  editMemberByID(id: number) {
   // console.log('edit', id);
    this.router.navigate(['/memberdetails/' + id]);
  }

  deleteMemberById(id: number) {
   // console.log('delete', id);
    if(confirm('Are you sure you want to remove this user?')) {
      this.appService.deleteMember(id).subscribe(isDeleted => {
        this.appService.getMembers().subscribe(members => (this.members = members));
       // console.log('deleted?:', isDeleted);
        } );
    }
  }
}
