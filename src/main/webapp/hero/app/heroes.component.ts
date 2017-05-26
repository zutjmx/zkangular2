import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  updateHeroPromise: Promise;
  binder = zkbind.$('$heroes');

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  getHeroes(): void {
    this.heroService
        .getHeroes();
//        .then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name);
//      .then(hero => {
//        this.heroes.push(hero);
//        this.selectedHero = null;
//      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id);
//        .then(() => {
//          this.heroes = this.heroes.filter(h => h !== hero);
//          if (this.selectedHero === hero) { this.selectedHero = null; }
//        });
  }

  ngOnInit(): void {
    //https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript
    this.binder.after('updateHero', this.setHeroes.bind(this));                 
    this.getHeroes();
  }

  setHeroes(heroes){
      this.heroes = heroes;
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/