import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('authToken');
    
    let clonedReq = req.clone({
        withCredentials: true
    });

    if (token) {
        clonedReq = clonedReq.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(clonedReq);
};
