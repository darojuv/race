import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Member from '../interfaces/memberInterface';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  selectedMemberId: number;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // get teams for dropdown
    this.appService.getTeams().subscribe(teams => {
      this.teams = teams;
      //console.log('teams', this.teams);
    });

    this.memberModel = {} as Member;
    this.memberModel.team ='';
    this.selectedMemberId = this.activatedRoute.snapshot.params['id'];
    //console.log('selected memberModel', this.selectedMemberId);
    if (this.selectedMemberId > 0) {
        this.appService.getMember(this.selectedMemberId).subscribe(m => {
        this.memberModel = m;
        //console.log('selected memberModel', this.memberModel);
      });
    }
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.selectedMemberId > 0) {
        this.memberModel.id = this.selectedMemberId;
        this.appService.updateMember(this.memberModel).subscribe(isUpdated => {
          // console.log('isUpdated', isUpdated);
        });
      } else {
        this.appService.addMember(this.memberModel).subscribe(isadded => {
         // console.log('isadded', isadded);
      });
  }
   // console.log('MemberObject', this.memberModel);
    this.router.navigate(['/members']);
  }

  clickCancel() {
    this.router.navigate(['/members']);
  }

}
