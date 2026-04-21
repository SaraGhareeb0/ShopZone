import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';



// export const authInterceptor: HttpInterceptorFn = (req, next) => {


//   
//   const userId = localStorage.getItem('userId');

//   let modifiedReq = req;

//   
//   if (userId) {
//     modifiedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${userId}`
//       }
//     });
//   }

//   return next(modifiedReq).pipe(

//     
//     tap((event: any) => {

//       // only for login request
//       if (req.url.includes('/users') && req.method === 'GET') {

//         if (event && Array.isArray(event) && event.length > 0) {

//           const user = event[0];

//          
//           localStorage.setItem('userId', user.id.toString());
//           localStorage.setItem('currentUser', JSON.stringify(user));
//         }
//       }

//     })
//   );
// };

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userId = localStorage.getItem('userId');

  if (userId) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userId}`
      }
    });
  }

  return next(req);
};