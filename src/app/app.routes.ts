import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: '**', redirectTo: '' },
];
