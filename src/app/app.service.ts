import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import Member from './interfaces/memberInterface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  DEBUG: Boolean = true;
  api = 'http://localhost:8000/api';
  username: string;
  member: Member;

  private selectedMemberId = new BehaviorSubject(0);
  currentMessage = this.selectedMemberId.asObservable();

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  // Returns a member
  getMember(id: number) {
    return this.http
      .get(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm: Member) {
    return this.http
    .post(`${this.api}/members`, memberForm);
  }

  updateMember(memberForm: Member) {
    return this.http
    .put(`${this.api}/members/${memberForm.id}`, memberForm);
  }

  deleteMember(id: number) {
    return this.http
    .delete(`${this.api}/members/${id}`);
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
