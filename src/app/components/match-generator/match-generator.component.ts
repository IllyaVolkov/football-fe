import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Match} from "../../interfaces/match";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-match-generator',
  templateUrl: './match-generator.component.html',
  styleUrl: './match-generator.component.scss'
})
export class MatchGeneratorComponent {
  public match: Match | null = null;
  public matchForm: FormGroup = new FormGroup({
    homeTeam: new FormControl('', Validators.required),
    visitorTeam: new FormControl('', Validators.required),
  });
  public errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  public generateMatch(): void {
      const homeTeamId = this.matchForm.get('homeTeam')?.value;
      const visitorTeamId = this.matchForm.get('visitorTeam')?.value;

      this.apiService.generateMatch(homeTeamId, visitorTeamId)
        .subscribe({
          next: (match: Match) => {
            this.match = match;
            this.errorMessage = null;
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.message;
            console.error(error);
          }
        });
    }
}
