import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match } from "../interfaces/match";
import { Universe } from "../interfaces/universe";
import { Team } from "../interfaces/team";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot = 'http://localhost:8000';
  private teamsPath = '/teams/';
  private universesPath = '/teams/universes';
  private matchesPath = '/matches/';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, with message: ${JSON.stringify(error.error)}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getUniverses(): Observable<Universe[]> {
    console.log('Getting Universes');
    return this.http.get<Universe[]>(this.apiRoot + this.universesPath).pipe(
      catchError(this.handleError)
    );
  }

  generateTeam(universe: string): Observable<Team> {
    const payload = {
      "universe": universe
    }
    return this.http.post<Team>(this.apiRoot + this.teamsPath, payload).pipe(
      catchError(this.handleError)
    );
  }

  generateMatch(homeTeamId: string, visitorTeamId: string): Observable<Match> {
    const payload = {
      "home_team": homeTeamId,
      "visitor_team": visitorTeamId,
    }
    return this.http.post<Match>(this.apiRoot + this.matchesPath, payload).pipe(
      catchError(this.handleError)
    );
  }
}
