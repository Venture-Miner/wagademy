import { Component } from '@angular/core';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'wagademy-build-training-data',
  standalone: true,
  imports: [SelectComponent, InputComponent],
  templateUrl: './build-training-data.component.html',
  styleUrl: './build-training-data.component.scss',
})
export class BuildTrainingDataComponent {
  items: any[] = Array(5).fill({});

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addNewItem() {
    this.items.push({});
  }

  saveItems() {
    //
  }
}
