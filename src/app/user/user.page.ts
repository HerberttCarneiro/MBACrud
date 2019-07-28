import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  private configUrl = 'https://mbaapi.herokuapp.com/'

  public initialState = {
    _id: null,
    email: null,
    first_name: null,
    last_name: null
  }
  public form = this.initialState
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    })
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.user) {
        this.form = JSON.parse(params.user);
      }
    });
  }

  submitForm() {
    if (this.form._id != null) {
      this.updateUser()
    } else {
      this.createUser()
    }
  }

  resetForm() {
    this.form = this.initialState;
  }

  updateUser() {
    this.http.put(`${this.configUrl}users`, this.form, this.httpOptions).subscribe(
      (response) => {
        if (response.hasOwnProperty('error')) {
          alert('Não foi possível salvar')
        } else {
          this.resetForm()
          this.location.back();
        }
      },
      (error) => {
        alert('Não foi possível salvar usuário')
      })
  }

  createUser() {
    this.http.post(`${this.configUrl}users`, this.form, this.httpOptions).subscribe(
      (response) => {
        if (response.hasOwnProperty('error')) {
          alert('Não foi possível salvar')
        } else {
          this.resetForm()
          this.router.navigate(['list']);
        }
      },
      (error) => {
        alert('Não foi possível salvar usuário')
      })
  }

  delete(id) {
    this.http.delete(`${this.configUrl}users/${id}`, { responseType: 'json', observe: 'response' }).subscribe(
      (response) => {
        this.location.back();
      },
      (error) => {
        alert('Não foi possível deletar usuário')
      })
  }
}
