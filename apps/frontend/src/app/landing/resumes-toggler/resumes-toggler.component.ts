import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wagademy-resumes-toggler',
  templateUrl: './resumes-toggler.component.html',
  styleUrls: ['./resumes-toggler.component.css'],
})
export class ResumesTogglerComponent {
  @Output() selectedBlockChange = new EventEmitter();

  selectedBlock: 'STUDENTS' | 'SQUADS' = 'STUDENTS';

  changeSelectedBlock(block: 'STUDENTS' | 'SQUADS') {
    this.selectedBlock = block;
    this.selectedBlockChange.emit(block);
  }
}
