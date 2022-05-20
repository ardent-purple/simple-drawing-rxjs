import './Toolbox.css'
import { Observable, fromEvent, from, of, mergeAll, merge } from 'rxjs'
import { combineLatestWith, concatWith, map, scan } from 'rxjs/operators'

export interface ToolboxOptions {
  lineWidth: number
  lineColor: CanvasFillStrokeStyles['strokeStyle']
}

type ToolboxOption = Partial<ToolboxOptions>

export default class Toolbox {
  private toolbox: HTMLDivElement
  private _observable: Observable<ToolboxOptions>

  constructor(options: ToolboxOptions) {
    this.toolbox = document.createElement('div')
    this.toolbox.classList.add('toolbox', 'active')

    const paraToolboxTip = document.createElement('p')
    paraToolboxTip.textContent = 'To toggle the toolbox press `T`'

    const lineColorInput = document.createElement('input')
    lineColorInput.type = 'color'
    lineColorInput.value = '#ffffff'

    const lineColorLabel = document.createElement('label')
    lineColorLabel.textContent = 'Line color: '
    lineColorLabel.htmlFor = lineColorInput.id = 'toolbox-line-color'

    const lineWidthInput = document.createElement('input')
    lineWidthInput.type = 'number'
    lineWidthInput.min = '1'
    lineWidthInput.max = '100'
    lineWidthInput.value = '3'

    const lineWidthLabel = document.createElement('label')
    lineWidthLabel.textContent = 'Line width: '
    lineWidthLabel.htmlFor = lineWidthInput.id = 'toolbox-line-width'

    this.toolbox.append(
      paraToolboxTip,
      lineColorLabel,
      lineColorInput,
      lineWidthLabel,
      lineWidthInput
    )

    // making observables
    const optionsObservable = of<ToolboxOptions>(options)
    const lineColorInputObservable = fromEvent<InputEvent>(
      lineColorInput,
      'change'
    ).pipe(
      map((changeEvent) => {
        const target = changeEvent.target! as HTMLInputElement
        return {
          lineColor: target.value,
        }
      })
    ) as Observable<ToolboxOption>

    const lineWidthInputObservable = fromEvent<InputEvent>(
      lineWidthInput,
      'change'
    ).pipe(
      map((changeEvent) => {
        const target = changeEvent.target! as HTMLInputElement
        return {
          lineWidth: Number(target.value),
        }
      })
    ) as Observable<ToolboxOption>

    const optionPartialObservable = merge(
      lineColorInputObservable,
      lineWidthInputObservable
    )

    this._observable = optionsObservable.pipe(
      concatWith(optionPartialObservable as Observable<ToolboxOptions>),
      scan((opts, partial) => ({
        ...opts,
        ...partial,
      }))
    )
  }

  get element() {
    return this.toolbox
  }

  get observable() {
    return this._observable
  }

  toggleToolbox() {
    this.toolbox.classList.toggle('active')
  }
}
