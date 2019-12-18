import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {
  constructor() {}
  handleError(error: any) {
    let errorResponse = {};
    console.log('an error occoured', error);
    if (error.error instanceof HttpErrorResponse) {
      // client-side error
      errorResponse = { message: error.error.message, errorCode: error.error.status, code: error.code };
    } else {
      // server-side error
      errorResponse = {
        message: error.message,
        errorCode: error.status,
        code: error.error.code
      };
    }
    return throwError(errorResponse);
  }
}
