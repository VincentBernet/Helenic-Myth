import { Injectable } from '@angular/core';
import { Article } from './article';
import { ARTICLES } from './mock-articles';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// Https Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesUrl = 'api/articles';  // URL to web api

  constructor(private messageService: MessageService, private http: HttpClient,) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
    .pipe(
      catchError(this.handleError<Article[]>('getArticles', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}



  /** Log a ArticleService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ArticleService Message: ${message}`);
  }

  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`Article id=${id} displayed`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  /** PUT: update the article on the server */
  updateArticle(article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap(_ => this.log(`Updated the article about ${article.name} on id=${article.id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new hero to the server */
addArticle(article: Article): Observable<Article> {
  return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
    tap((newArticle: Article) => this.log(`New Article about ${newArticle.name} create on id=${newArticle.id}` )),
    catchError(this.handleError<Article>('addArticle'))
  );
}

/** DELETE: delete the hero from the server */
deleteArticle(id: number): Observable<Article> {
  const url = `${this.articlesUrl}/${id}`;

  return this.http.delete<Article>(url, this.httpOptions).pipe(
    tap(_ => this.log(`The article on id=${id} has been deleted`)),
    catchError(this.handleError<Article>('deleteArticle'))
  );
}

/* GET heroes whose name contains search term */
searchArticles(term: string): Observable<Article[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Article[]>(`${this.articlesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found articles matching "${term}"`) :
       this.log(`no articles matching "${term}"`)),
    catchError(this.handleError<Article[]>('searchArticles', []))
  );
}

}
