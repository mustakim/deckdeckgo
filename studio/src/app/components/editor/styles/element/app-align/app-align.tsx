import {Component, Event, EventEmitter, h, Prop, State} from '@stencil/core';

import {AlignUtils, TextAlign} from '../../../../../utils/editor/align.utils';

@Component({
  tag: 'app-align',
  styleUrl: 'app-align.scss',
})
export class AppAlign {
  @Prop()
  selectedElement: HTMLElement;

  @State()
  private align: TextAlign | undefined;

  @Event() alignChange: EventEmitter<void>;

  async componentWillLoad() {
    this.align = await AlignUtils.getAlignment(this.selectedElement);
  }

  private async updateAlign($event: CustomEvent): Promise<void> {
    if (!this.selectedElement || !$event || !$event.detail) {
      return;
    }

    this.selectedElement.style.textAlign = $event.detail.value;
    this.align = $event.detail.value;

    this.alignChange.emit();
  }

  render() {
    if (this.align === undefined) {
      return undefined;
    }

    return (
      <app-expansion-panel>
        <ion-label slot="title">Alignment</ion-label>
        <ion-list>
          <ion-item class="select">
            <ion-label>Alignment</ion-label>

            <ion-select
              value={this.align}
              placeholder="Select an alignment"
              onIonChange={($event: CustomEvent) => this.updateAlign($event)}
              interface="popover"
              mode="md"
              class="ion-padding-start ion-padding-end">
              <ion-select-option value={TextAlign.LEFT}>Left</ion-select-option>
              <ion-select-option value={TextAlign.CENTER}>Center</ion-select-option>
              <ion-select-option value={TextAlign.RIGHT}>Right</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </app-expansion-panel>
    );
  }
}
