import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  public list
  // private configUrl = 'https://mbaapi.herokuapp.com/';
  private configUrl = 'http://localhost/api/web/'
  loading: HTMLIonLoadingElement;


  constructor(
    public http: HttpClient,
    public router: Router,
    public loadingController: LoadingController
  ) { }
  ionViewWillEnter() {
    this.presentLoading()
  }
  update(user) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user)
      }
    };
    this.router.navigate(['user'], navigationExtras);
  }
  async presentLoading() {

    this.loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await this.loading.present();

    this.http.get(`${this.configUrl}users`, { responseType: 'json', observe: 'response' }).subscribe(
      (response) => {
        this.list = response.body
      },
      (error) => {
        alert('Não foi possível buscar usuários')
      })
    this.loading.dismiss();

  }
}