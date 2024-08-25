import {Component, OnInit} from '@angular/core';
import {Universe} from "../../interfaces/universe";
import {ApiService} from "../../services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Team} from "../../interfaces/team";


@Component({
  selector: 'app-team-generator',
  templateUrl: './team-generator.component.html',
  styleUrl: './team-generator.component.scss'
})
export class TeamGeneratorComponent implements OnInit {
  public universes: Universe[] = [];
  public universeForm: FormGroup = new FormGroup({
    universeName: new FormControl('', Validators.required),
  });
  public team: Team | null = null;
  public errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUniverses().subscribe({
      next: (data) => this.universes = data,
      error: (error) => console.error(error)
    });
  }

  onSubmit() {
    const universeName = this.universeForm.value["universeName"];
    this.apiService.generateTeam(universeName).subscribe({
      next: (data) => {
        this.team = data;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error(error);
      }
    });
  }
}
