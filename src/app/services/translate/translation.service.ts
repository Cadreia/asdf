import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public messages = {};
  constructor(private http: HttpClient) {}

  getTranslationMessages(lang: string) {
    return new Promise<{}>((resolve, reject) => {
      const transPath = `${config.asset_dir}/lang/${lang ||
        config.default_lang}.json`;
      this.http.get<{}>(transPath).subscribe(
        message => {
          if (message) {
            this.messages = message;
            resolve(this.messages);
          }
        },
        error => {
          console.log(error);
          resolve(this.messages);
        }
      );
    });
  }
}
