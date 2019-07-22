import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import chartJs from 'chart.js';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  @ViewChild('pieCanvas') pieCanvas;
  pieChart: any;
  currentItems: Item[];
  constructor(public navCtrl: NavController,
      public items: Items, 
      public modalCtrl: ModalController) {
        this.currentItems = this.items.query();
       }
       ngAfterViewInit() {
        setTimeout(() => {
          this.pieChart = this.getPieChart();
        }, 350);
    
      }
      getChart(context, chartType, data, options?) {
        return new chartJs(context, {
          data,
          options,
          type: chartType,
        });
      }
      getPieChart() {
    const data = {
      labels: ['Astrid', 'Mushlihun', 'Najla'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);

  }
  addItem() {
    // let addModal = this.modalCtrl.create('ItemCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.items.add(item);
    //   }
    // })
    // addModal.present();
    this.navCtrl.push('ItemCreatePage');
  }
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
