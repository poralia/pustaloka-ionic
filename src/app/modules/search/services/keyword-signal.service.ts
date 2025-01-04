import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeywordSignalService {

  public keyword: WritableSignal<string> = signal<string>('');

  constructor() { }

  set(text: string) {
    this.keyword.set(text);
  }

  get(): string {
    return this.keyword();
  }
  
}
