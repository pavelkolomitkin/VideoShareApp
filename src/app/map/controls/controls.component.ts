import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  actionStates = {
    addVideo: false
  };

  @Output('onAddVideoChange') addVideoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

  }

    onChangeState(controlName, $event) {
        this.actionStates[controlName] = !this.actionStates[controlName];

        switch (controlName) {
            case 'addVideo':
                this.addVideoChange.emit(this.actionStates.addVideo);
              break;
        }

    }

}
