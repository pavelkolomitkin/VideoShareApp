import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit, OnChanges {

  @ViewChild('modal') modal: ElementRef;

  @Output('onClose') onCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() public isOpen: boolean = false;

  @Input() headerText: string = '';

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {

    // console.log('Modal window component [CHANGES!]');
    // if (this.isOpen)
    // {
    //   this.showWindow();
    // }
    // else
    // {
    //   this.hideWindow();
    // }
  }

  ngOnInit() {
      $(this.modal.nativeElement).on('hidden.bs.modal', (event) => {
          this.onCloseEvent.emit();
      });
  }

  public showWindow()
  {
     $(this.modal.nativeElement).modal('show');
  }

  public hideWindow()
  {
      $(this.modal.nativeElement).modal('hide');
  }

}