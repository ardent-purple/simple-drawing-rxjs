import './index.css'
import Canvas from './Canvas'
import Toolbox, { ToolboxOptions } from './Toolbox'
import {
  animationFrameScheduler,
  concatAll,
  filter,
  fromEvent,
  map,
  Observable,
  observeOn,
  pairwise,
  takeUntil,
} from 'rxjs'

const DEFAULT: ToolboxOptions = {
  lineWidth: 5,
  lineColor: 'white',
}

const drawingField = new Canvas({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight - 5,
  ...DEFAULT,
})

const toolbox = new Toolbox(DEFAULT)

const keyboardObservable = fromEvent<KeyboardEvent>(window, 'keyup')
const toolboxHotkeyObservable = keyboardObservable.pipe(
  filter(({ key }) => key === 't')
)
toolboxHotkeyObservable.subscribe(() => toolbox.toggleToolbox())

toolbox.observable.subscribe((opts) => {
  drawingField.setOpts(opts)
})

// making click and drag observable
const clickAndDragObservable = fromEvent(
  drawingField.element,
  'mousedown'
).pipe(
  map(() =>
    fromEvent(drawingField.element, 'mousemove').pipe(
      pairwise(),
      observeOn(animationFrameScheduler),
      takeUntil(fromEvent(drawingField.element, 'mouseup'))
    )
  ),
  concatAll()
) as Observable<[PointerEvent, PointerEvent]>

clickAndDragObservable.subscribe(
  ([{ clientX: x1, clientY: y1 }, { clientX: x2, clientY: y2 }]) =>
    drawingField.drawLine(x1, y1, x2, y2)
)

document.body.append(drawingField.element)
document.body.append(toolbox.element)
