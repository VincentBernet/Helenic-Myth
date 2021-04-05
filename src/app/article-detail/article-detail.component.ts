import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  //@Input() article?: Article;
  //@Input() article?: Article;
  article!: Article;
  displayUpdate = false;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {

    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id)
      .subscribe(article => this.article = article);
  }

  save()
  {
    this.articleService.updateArticle(this.article)
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  modifyDisplay() {
    this.displayUpdate=!this.displayUpdate;
  }
}
