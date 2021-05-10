import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    // TODO
    // Реализовать вывод пагинации по 10 страниц
    // TODO END

    return [...Array(end).keys()].map(el => el + start);
  }
}
