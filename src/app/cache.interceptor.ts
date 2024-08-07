import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache: Map<string, HttpResponse<unknown>> = new Map();

export function cachingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const cachedResponse = cache.get(req.url);
  console.log({
    cachedResponse,
    cache,
  });
  if (cachedResponse) {
    return of(cachedResponse.clone());
  } else {
    return next(req).pipe(
      tap((stateEvent) => {
        if (stateEvent instanceof HttpResponse) {
          cache.set(req.url, stateEvent.clone());
        }
      }),
    );
  }
}
