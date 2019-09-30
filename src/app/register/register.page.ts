import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import consts from '../config/consts';
import { ToastController, NavController } from '@ionic/angular';
import { ToastService } from '../toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    userPhone;
    userPass = '';
    userName: string = "";
    userData: any;
    response: any;
    userPassServer;
    condition: boolean = false;
    registerState: boolean = false;

    constructor(private router: Router, private httpClient: HttpClient, private toast: ToastService, private navController: NavController) {
    }

    ngOnInit() {
    }

    makeAuth() {
        if (this.userPass.length === 0 && !this.condition) {
            const phone = '+' + this.userPhone.replace(/\D/g, '');
            this.httpClient.get(consts.url +
                `app.php?action=auth&userPhone=${phone}`)
                .subscribe(data => {
                    this.response = data;
                    if (this.response.error) {
                        this.toast.showToast(this.response.error);
                        return;
                    }
                    this.userData = this.response.user_data;
                    this.userPassServer = this.response.user_data.pass;
                    this.toast.showToast('На ваш номер был отправлен пароль в виде SMS!');
                    this.condition = true;
                    this.httpClient.get('https://api.mobizon.kz/service/message/sendsmsmessage?recipient=' + this.userPhone + '&text=Код потверждения: ' + this.userPassServer + '&apiKey=kz4f23285577ca032ca69150a6fd7378d04a8da887e3e6dc06393bdbfa446185e0d961')
                        .subscribe(data => {
                            console.log(data);
                        })
                })
        }
        else {
            if (this.userPass == this.userPassServer) {
                localStorage.setItem('user_data', JSON.stringify(this.userData));
                this.router.navigateByUrl('/home');
            }
            else {
                this.toast.showToast('Введенный вами пароль не совпадает с отправленным по SMS!');
            }
        }
    }

    register() {
        if (!this.condition) {
            if (this.userPhone && this.userName) {
                this.userName = this.userName.trim();
                const phone = '+' + this.userPhone.replace(/\D/g, '');
                this.httpClient.get(`${consts.url}app.php?action=createUser&name=${this.userName}&phone=${phone}`)
                    .subscribe(data => {
                        const user_data: any = data;
                        this.userData = user_data;
                        this.userPassServer = user_data.pass;
                        this.toast.showToast('На ваш номер был отправлен пароль в виде SMS!');
                        this.condition = true;
                        const url = `https://api.mobizon.kz/service/message/sendsmsmessage?recipient=${user_data.phone}&text=Код потверждения: ${user_data.pass}&apiKey=kz4f23285577ca032ca69150a6fd7378d04a8da887e3e6dc06393bdbfa446185e0d961`;
                        console.log(url);
                        this.httpClient.get(url).subscribe(data => {
                            console.log(data)
                        });
                    })
            }
        }
        else {
            if (this.userPass == this.userPassServer) {
                localStorage.setItem('user_data', JSON.stringify(this.userData));
                this.router.navigateByUrl('/home');
            }
            else {
                this.toast.showToast('Введенный вами пароль не совпадает с отправленным по SMS!');
            }
        }
    }

    back() {
        this.navController.back();
    }


}
