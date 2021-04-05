import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Article } from '../article';
import { ArticleService } from '../article.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  AdminMode = true;
  LoginMode = false;
  Message = false;


  //articles: Article[] = [];
  //articles: Article[] = [];
  articles!: Article[];
  
  constructor(private articleService: ArticleService, private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getArticles();
  }

  filterType(mythType: string){
    return this.articles.filter((article) => article.type === mythType);
  }

  getArticles(): void {
    this.articleService.getArticles()
        .subscribe(articles => this.articles = articles);
  }

  goBack(): void {
    this.location.back();
  }

  add(name: string, description: string, title: string, type: string,  imageUrl: string, author: string): void {
    this.Message = true;
    name = name.trim();
    description = description.trim();
    type = type.trim();
    title = title.trim();
    imageUrl = imageUrl.trim();
    author = author.trim();

    /*if (!name || !description || !type || !title || (!imageUrl) ) { 
      return; }*/
    this.articleService.addArticle({ name, description, type, title, imageUrl, author } as Article)
      .subscribe(article => {
        this.articles.push(article);
      });
  }

  delete(article: Article): void {

    this.Message = true;
    this.articles = this.articles.filter(a => a !== article);
    this.articleService.deleteArticle(article.id).subscribe();
  }

  inversLogin() {
    this.LoginMode = !this.LoginMode;
  }

  function ()
  {
    this.Message = true;
  }
}
