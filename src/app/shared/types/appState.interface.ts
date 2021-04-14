import {AuthStateInterface} from 'src/app/shared/types/authState.interface';

// Данный интерфейс будет нам показывать все состояние приложения
export interface AppStateInterface {
  auth: AuthStateInterface;
}
