import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // <-- Importa RouterModule
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  correo = '';
  contrasena = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async login() {
    try {
      const cuidador = await this.http.post<any>(
        environment.SERVER_URL+'/api/login',
        {
          correo: this.correo.trim(),
          contrasena: this.contrasena.trim()
        }
      ).toPromise();

      // Si llega aquí, login exitoso
      localStorage.setItem('cuidador', JSON.stringify(cuidador));
      this.navCtrl.navigateRoot('/home');

    } catch (error) {
      // Si el backend responde error (401, etc)
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
