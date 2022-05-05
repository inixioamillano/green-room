import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private location: Location) { }

  getExternalURL(url = ''): string {
    return location.origin + this.location.prepareExternalUrl(url);
  }
}
