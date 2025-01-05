import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUpdateProfile } from '../../interfaces';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FileTransfer, FileUploadOptions, FileUploadResult } from '@awesome-cordova-plugins/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-setting-screen',
  templateUrl: './setting-screen.component.html',
  styleUrls: ['./setting-screen.component.scss'],
  standalone: false,
})
export class SettingScreenComponent  implements OnInit {

  public me$: Observable<{ data: any, statuses: string }>;
  public formGroup: FormGroup = new FormGroup({});
  public uid: string | null = null;
  public avatarFile: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { 
    this.me$ = this.authService.selectMe();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Retrieve Me Success':
          this.uid = action.data.id;
          this.formGroup.patchValue({
            email: action.data.email,
            name: action.data.name,
            username: action.data.mention_name,
          });
          break;
      }
    });
  }

  async presentAlert(message: string) {
    const alrt = await this.alertCtrl.create({
      message: message,
    });

    await alrt.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Memproses...',
      backdropDismiss: false,
    });

    await loading.present();
  }

  ngOnInit() {
    this.authService.retrieveMe();
    this.formGroup = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.email]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  submitHandler() {
    const payload: IUpdateProfile = {
      ...this.formGroup.value,
    }

    this.authService.updateProfile('me', payload);
  }

  onUploadAvatar(event: any) {
    this.authService.uploadAvatar(this.uid, event.target.files[0]);
    event.target.value = '';
    this.avatarFile = '';
  }

  /**
   * Select image for avatar
   */
  async selectAvatar() {
    const image = await Camera.getPhoto({
      quality: 50,
      width: 300,
      height: 300,
      allowEditing: false,
      resultType: Capacitor.isNativePlatform() ? CameraResultType.Uri : CameraResultType.DataUrl,
      saveToGallery: false,
      webUseInput: true,
    });

    if (Capacitor.isNativePlatform()) {
      this.presentLoading();
      this.transferFile(image.path);
    } else {
      this.base64ToBlob(image);
    } 
  }

  async base64ToBlob(image: any) {
    this.urltoFile(image.dataUrl, `avatar-${Date.now()}.jpg`, 'image/jpeg')
      .then((file) => {
        // You now have a file object that you can attach to a form e.g.
        this.authService.uploadAvatar(this.uid, file);
      });
  }

  async urltoFile(url: any, filename: string, mimeType: string) {
    return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, { type: mimeType });})
    );
  }

  async transferFile(path: string | undefined) {
    const auth = await this.authService.getAuth();
    const token = auth.token;
    const uid = auth.user_id;

    if (path) {
      const options: FileUploadOptions = {
        headers: { 'Authorization': `Bearer ${token}` },
        httpMethod: 'POST',
        params: { action: 'bp_avatar_upload' },
      }

      const ft = new FileTransfer();

      // listen progress
      ft.create().onProgress((event: ProgressEvent) => {
        
      });

      // start upload
      ft.create().upload(path, encodeURI(`${environment.restEndpoint}/buddypress/v1/members/${uid}/avatar`), options, true)
        .then((res: FileUploadResult) => {
          this.authService.retrieveMe();
          this.loadingCtrl.dismiss();
        })
        .catch(error => {
          this.presentAlert(JSON.stringify(error));
          this.loadingCtrl.dismiss();
        });
    }
  }

  logoutHandler() {
    this.authService.logout();
  }

}
