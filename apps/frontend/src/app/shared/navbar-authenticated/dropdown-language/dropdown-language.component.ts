import { Component } from '@angular/core';

@Component({
  selector: 'lens-academy-dropdown-language',
  templateUrl: './dropdown-language.component.html',
  styleUrls: ['./dropdown-language.component.css'],
})
export class DropdownLanguageComponent {
  showDropdown = false;
  selectedLanguage: 'en' | 'pt' = 'en';
}
