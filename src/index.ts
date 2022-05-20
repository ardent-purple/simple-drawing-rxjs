import './index.css'
import Canvas from './Canvas'
import {
  animationFrameScheduler,
  concatAll,
  fromEvent,
  map,
  Observable,
  observeOn,
  pairwise,
  takeUntil,
} from 'rxjs'

const drawingField = new Canvas({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight - 5,
})

/**
 * 3 events: mousedown, mousemove, mouseup
 * mousemove emits only if mousedown is active
 */

// const mousedownObservable =
// const mousemoveObservable = fromEvent(drawingField.element, 'mousemove')
// const mouseupObservable = fromEvent(drawingField.element, 'mouseup')

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

// mousedownObservable.subscribe(() => console.log('down'))
// mousemoveObservable.subscribe(() => console.log('move'))
// mouseupObservable.subscribe(() => console.log('up'))

document.body.append(drawingField.element)
drawingField.drawLine(0, 0, 50, 50)
drawingField.drawLine(50, 50, 200, 50)
drawingField.drawLine(200, 50, 200, 200)

/*

OK, what we want as a result:
1.
* A canvas that we can draw with white color on black on by clicking and dragging or by touching and dragging
* canvas takes the whole screen
* We draw a line on each animation frame between last pointer position and current pointer position
* We want to clear canvas with black color on a click of a button

*/
